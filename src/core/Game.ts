import * as THREE from 'three'
import { EventBus } from './EventBus'
import { Time } from './Time'
import { GameLoop } from './GameLoop'
import { Debug } from './Debug'
import { RendererFactory } from '../renderer/RendererFactory'
import { CameraManager } from '../renderer/CameraManager'
import { Lighting } from '../renderer/Lighting'
import { SceneManager } from '../scene/SceneManager'
import { LevelLoader } from '../scene/LevelLoader'
import type { Level } from '../scene/Level'
import { AssetManager } from '../assets/AssetManager'
import { PreloadQueue } from '../assets/PreloadQueue'
import { InputManager } from '../input/InputManager'
import type { InputState } from '../input/InputManager'
import { PhysicsWorld } from '../physics/PhysicsWorld'
import { Player } from '../player/Player'
import { AIManager } from '../ai/AIManager'
import { EffectsManager } from '../effects/EffectsManager'
import { AudioManager } from '../audio/AudioManager'
import { WeaponAudio } from '../audio/WeaponAudio'
import { FootstepAudio } from '../audio/FootstepAudio'
import { WeaponManager } from '../weapons/WeaponManager'
import { MissionManager } from '../missions/MissionManager'
import { GrenadeSystem } from '../combat/GrenadeSystem'
import { HUD } from '../ui/HUD'
import { GameConfig } from './Config'

export class Game {
  private readonly time = new Time()
  private readonly loop: GameLoop
  private readonly sceneManager = new SceneManager()
  private readonly cameraManager = new CameraManager()
  private readonly physics = new PhysicsWorld()
  private readonly assets = new AssetManager()
  private readonly input: InputManager
  private readonly rendererInfo
  private readonly lighting: Lighting
  private readonly effects: EffectsManager
  private readonly audio = new AudioManager()
  private readonly weaponAudio = new WeaponAudio(this.audio)
  private readonly footstepAudio = new FootstepAudio(this.audio)
  private readonly hud: HUD
  private readonly grenades: GrenadeSystem
  private player!: Player
  private level!: Level
  private ai!: AIManager
  private weapons!: WeaponManager
  private mission!: MissionManager
  private paused = true

  constructor(private readonly canvas: HTMLCanvasElement, private readonly events: EventBus) {
    this.rendererInfo = RendererFactory.create(canvas)
    this.lighting = new Lighting(this.scene)
    this.effects = new EffectsManager(this.scene)
    this.input = new InputManager(canvas, events)
    this.hud = new HUD(events)
    this.grenades = new GrenadeSystem(this.scene, this.effects, events)
    this.loop = new GameLoop({ update: (d) => this.update(d), fixedUpdate: () => {}, render: () => this.render() })
    window.addEventListener('resize', this.resize)
    events.on('game:pause', () => { this.paused = true; this.loop.setPaused(true) })
    events.on('game:resume', () => { this.paused = false; this.loop.setPaused(false) })
    events.on('player:supply', (payload) => {
      if (payload.type === 'ammo') this.weapons?.refillAmmo()
      if (payload.type === 'armor') { this.player?.health.restoreArmor(35); this.events.emit('ui:toast', { message: '护甲板已更换', tone: 'success' }) }
      if (payload.type === 'medkit') { this.player.health.medkits++; this.events.emit('ui:toast', { message: '医疗包 +1', tone: 'success' }) }
    })
    events.on('player:death', () => {
      this.events.emit('ui:toast', { message: '你已阵亡，刷新页面重新开始', tone: 'danger' })
      this.input.pointerLock.exit()
    })
  }

  get scene(): THREE.Scene { return this.sceneManager.scene }
  get camera(): THREE.PerspectiveCamera { return this.cameraManager.camera }

  async init(): Promise<void> {
    this.events.emit('loading:progress', { label: '初始化渲染器', progress: 0.05 })
    this.scene.add(this.camera)

    const preload = new PreloadQueue((label, progress) => this.events.emit('loading:progress', { label, progress }))
    await preload.run([
      { label: '建立物理世界', task: async () => undefined },
      { label: '生成战术训练基地', task: async () => {
        this.level = await new LevelLoader(this.assets, this.physics).loadTrainingBase(this.scene)
      }},
      { label: '创建玩家与武器系统', task: async () => {
        this.player = new Player(this.camera, this.physics, this.events)
        this.weapons = new WeaponManager(this.camera, this.physics, this.events, this.effects, this.weaponAudio)
      }},
      { label: '部署敌人 AI', task: async () => {
        this.ai = new AIManager()
        this.ai.spawnInitial(8)
        this.scene.add(this.ai.group)
      }},
      { label: '启动任务系统', task: async () => {
        this.mission = new MissionManager(this.events)
      }}
    ])

    this.resize()
    this.events.emit('game:ready', undefined)
    this.events.emit('ui:toast', { message: '点击画面锁定鼠标并开始行动', tone: 'info' })
    Debug.warn(`Renderer: ${this.rendererInfo.backend}; WebGPU available: ${this.rendererInfo.webgpuAvailable}`)
  }

  start(): void {
    this.loop.setPaused(false)
    this.paused = false
    this.loop.start()
  }

  private update(delta: number): void {
    this.time.tick(delta)
    const input: InputState = this.input.read()
    if (input.debug) GameConfig.showDebug = !GameConfig.showDebug

    const moving = input.moveForward || input.moveBackward || input.moveLeft || input.moveRight
    const aiming = input.aim
    this.player.update(input, delta, this.level, aiming)
    this.ai.update(delta, this.player, this.level, this.physics)
    this.weapons.update(input, delta, this.time.elapsed, this.ai.enemies, moving)
    if (input.grenade) {
      if (!this.grenades.throwFrom(this.camera)) this.events.emit('ui:toast', { message: '没有手雷', tone: 'danger' })
    }
    this.grenades.update(delta, this.ai.enemies, this.player)
    this.effects.update(delta)
    if (this.effects.currentShake > 0.001) this.player.cameraRig.addShake(this.effects.currentShake)
    this.footstepAudio.update(delta, moving, input.sprint)
    this.mission.update(this.player)

    this.cameraManager.setFov(aiming ? this.weapons.current.config.adsFov : input.sprint ? 78 : 72)
    this.hud.health.set(this.player.health.health, this.player.health.maxHealth)
    this.hud.status.set(this.player.health.armor, this.player.health.maxArmor, this.player.state.stamina, this.player.state.maxStamina, this.player.health.medkits, this.grenades.count)
    this.hud.ammo.set(this.weapons.current.config.displayName, this.weapons.current.state.ammo, this.weapons.current.state.reserve)
    this.hud.interaction.setVisible(Boolean(this.player.interaction.current), this.player.interaction.currentLabel || '按 F 交互')
    this.updateDebug()
    this.input.endFrame()
  }

  private render(): void {
    this.rendererInfo.renderer.render(this.scene, this.camera)
  }

  private resize = (): void => {
    const width = window.innerWidth
    const height = window.innerHeight
    this.cameraManager.resize(width, height)
    this.rendererInfo.renderer.setPixelRatio(RendererFactory.pixelRatio())
    this.rendererInfo.renderer.setSize(width, height, false)
  }

  private updateDebug(): void {
    const p = this.player.controller.position
    this.hud.setDebug(GameConfig.showDebug, [
      `FPS: ${this.time.fps}`,
      `Renderer: ${this.rendererInfo.backend}`,
      `WebGPU available: ${this.rendererInfo.webgpuAvailable}`,
      `Enemies alive: ${this.ai.aliveCount()}`,
      `Armor/Stamina: ${Math.round(this.player.health.armor)} / ${Math.round(this.player.state.stamina)}`,
      `Grenades/Medkits: ${this.grenades.count} / ${this.player.health.medkits}`,
      `Game build: ${GameConfig.version}`,
      `Position: ${p.x.toFixed(1)}, ${p.y.toFixed(1)}, ${p.z.toFixed(1)}`,
      `Paused: ${this.paused}`
    ].join('\n'))
  }
}
