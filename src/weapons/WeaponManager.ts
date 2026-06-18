import * as THREE from 'three'
import type { InputState } from '../input/InputManager'
import type { Enemy } from '../ai/Enemy'
import type { PhysicsWorld } from '../physics/PhysicsWorld'
import type { EventBus } from '../core/EventBus'
import type { EffectsManager } from '../effects/EffectsManager'
import type { WeaponAudio } from '../audio/WeaponAudio'
import { WeaponData } from './WeaponData'
import { Weapon } from './Weapon'
import { FireControl } from './FireControl'
import { HitScan } from './HitScan'
import { RecoilSystem } from './RecoilSystem'

export class WeaponManager {
  readonly holder = new THREE.Group()
  readonly weapons = WeaponData.map((config) => new Weapon(config))
  readonly recoil = new RecoilSystem()
  activeIndex = 0

  constructor(
    private readonly camera: THREE.PerspectiveCamera,
    private readonly physics: PhysicsWorld,
    private readonly events: EventBus,
    private readonly effects: EffectsManager,
    private readonly audio: WeaponAudio
  ) {
    this.holder.add(this.current.model)
    this.camera.add(this.holder)
  }

  get current(): Weapon { return this.weapons[this.activeIndex] }

  update(input: InputState, delta: number, time: number, enemies: Enemy[], moving: boolean): void {
    if (input.weapon1) this.switchTo(0)
    if (input.weapon2) this.switchTo(1)
    if (input.weapon3) this.switchTo(2)
    const weapon = this.current
    if (input.reload && weapon.startReload()) {
      this.audio.reload()
      this.events.emit('weapon:reload:start', { weaponId: weapon.config.id })
    }
    const now = time
    if (weapon.state.ammo <= 0 && input.firePressed) {
      this.audio.empty()
      this.events.emit('weapon:empty', { weaponId: weapon.config.id })
    }
    if (FireControl.canFire(weapon.config, weapon.state, now, input.fire, input.firePressed)) {
      this.fire(enemies, input.aim, now)
    }
    weapon.update(delta, time, moving, input.aim)
    this.recoil.update(delta)
  }

  refillAmmo(): void {
    for (const weapon of this.weapons) {
      weapon.state.reserve = Math.max(weapon.state.reserve, weapon.config.reserveAmmo)
    }
    this.events.emit('ui:toast', { message: '弹药已补充', tone: 'success' })
  }

  private switchTo(index: number): void {
    if (index === this.activeIndex || !this.weapons[index]) return
    this.holder.remove(this.current.model)
    this.activeIndex = index
    this.holder.add(this.current.model)
  }

  private fire(enemies: Enemy[], aiming: boolean, now: number): void {
    const weapon = this.current
    FireControl.consume(weapon.config, weapon.state, now)
    this.audio.fire()
    weapon.animation.fire()
    const kick = this.recoil.add(weapon.config)
    this.events.emit('weapon:fire', { weaponId: weapon.config.id, ammo: weapon.state.ammo, reserve: weapon.state.reserve })

    const origin = new THREE.Vector3()
    const direction = new THREE.Vector3()
    this.camera.getWorldPosition(origin)
    this.camera.getWorldDirection(direction)
    const spread = aiming ? weapon.config.adsSpread : weapon.config.hipSpread
    const result = HitScan.fire(origin, direction, weapon.config, enemies, this.physics, spread)
    const muzzle = origin.clone().addScaledVector(direction, 0.9).add(new THREE.Vector3(0.08, -0.08, 0))
    this.effects.muzzle.trigger(muzzle)
    this.effects.tracer.spawn(muzzle, result.kind === 'miss' ? result.point : result.point)
    if (result.kind === 'enemy') {
      this.effects.impact.spawn(result.point, true)
      this.events.emit('combat:hit', { targetId: result.enemy.id, damage: result.damage, isKill: result.killed })
      if (result.killed) this.events.emit('enemy:death', { id: result.enemy.id })
    } else if (result.kind === 'world') {
      this.effects.impact.spawn(result.point)
      this.effects.decals.addBulletHole(result.point, result.normal)
    }
    this.camera.rotation.x -= kick
    this.effects.screenShake.add(weapon.config.type === 'smg' ? 0.025 : 0.04)
  }
}
