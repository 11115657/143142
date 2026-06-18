import * as THREE from 'three'
import type { EnemyConfig } from '../types/enemy'
import { Materials } from '../renderer/Materials'
import { EnemyStateMachine } from './EnemyStateMachine'
import { EnemyPerception } from './EnemyPerception'
import { EnemyMovement } from './EnemyMovement'
import { EnemyCombat } from './EnemyCombat'
import { PatrolRoute } from './PatrolRoute'
import type { Player } from '../player/Player'
import type { Level } from '../scene/Level'
import type { PhysicsWorld } from '../physics/PhysicsWorld'

export class Enemy {
  readonly group = new THREE.Group()
  readonly state = new EnemyStateMachine()
  readonly perception: EnemyPerception
  readonly movement = new EnemyMovement()
  readonly combat: EnemyCombat
  readonly patrol: PatrolRoute
  health: number
  armor: number
  isDead = false
  private reaction = 0
  private targetCover: THREE.Vector3 | null = null
  private readonly healthFill = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.045, 0.035), new THREE.MeshBasicMaterial({ color: 0xff425b }))

  constructor(readonly id: string, readonly config: EnemyConfig, position: THREE.Vector3) {
    this.health = config.health
    this.armor = config.armor
    this.perception = new EnemyPerception(config.detectionRange)
    this.combat = new EnemyCombat(config)
    this.patrol = new PatrolRoute([
      position.clone(),
      position.clone().add(new THREE.Vector3(3 + Math.random() * 6, 0, -2 - Math.random() * 2)),
      position.clone().add(new THREE.Vector3(-2 - Math.random() * 4, 0, 3 + Math.random() * 5))
    ])
    this.group.position.copy(position)
    this.buildFallbackMesh()
  }

  update(delta: number, player: Player, level: Level, physics: PhysicsWorld): void {
    if (this.isDead) return
    this.perception.update(delta)
    this.reaction = Math.max(0, this.reaction - delta)
    const playerPos = player.controller.position
    const distance = this.group.position.distanceTo(playerPos)
    const seen = this.perception.canSee(this.group.position, playerPos, physics)
    const lowHealth = this.health / this.config.health < 0.38

    if (seen) this.perception.raiseAlert(0.45)
    if (lowHealth && seen && !this.targetCover) this.targetCover = level.nearestCover(this.group.position, playerPos)

    if (this.targetCover && this.group.position.distanceTo(this.targetCover) > 1.15) this.state.set('take_cover')
    else if (seen && distance <= this.config.attackRange && this.reaction <= 0) this.state.set('attack')
    else if (seen) {
      if (this.reaction <= 0) this.reaction = this.config.reactionTime
      this.state.set('chase')
    } else if (this.perception.alertness > 0.2) this.state.set('search')
    else this.state.set('patrol')

    if (this.state.state === 'patrol') {
      this.movement.moveToward(this.group.position, this.patrol.current(), this.config.speed * 0.45, delta)
      this.patrol.advanceIfClose(this.group.position)
    } else if (this.state.state === 'search') {
      this.movement.moveToward(this.group.position, this.patrol.current(), this.config.speed * 0.55, delta)
      this.patrol.advanceIfClose(this.group.position)
    } else if (this.state.state === 'chase') {
      this.movement.moveToward(this.group.position, playerPos, this.config.speed, delta)
    } else if (this.state.state === 'take_cover' && this.targetCover) {
      this.movement.moveToward(this.group.position, this.targetCover, this.config.speed * 1.1, delta)
    } else if (this.state.state === 'attack') {
      this.movement.holdDistance(this.group.position, playerPos, this.config.preferredDistance, this.config.speed, delta)
      this.combat.update(delta, player, distance, seen)
    }

    this.group.lookAt(new THREE.Vector3(playerPos.x, this.group.position.y, playerPos.z))
    this.updateHealthBar()
  }

  damage(amount: number, hitZone: 'head' | 'torso' | 'limb' = 'torso', armorPenetration = 0.2): boolean {
    if (this.isDead) return false
    const zoneMultiplier = hitZone === 'head' ? 2.25 : hitZone === 'limb' ? 0.72 : 1
    const effectiveArmor = Math.max(0, this.armor * (1 - armorPenetration))
    const reduced = Math.max(2, amount * zoneMultiplier - effectiveArmor * 0.06)
    this.armor = Math.max(0, this.armor - amount * armorPenetration * 0.35)
    this.health -= reduced
    this.perception.raiseAlert(0.8)
    if (this.health <= 0) {
      this.die()
      return true
    }
    return false
  }

  hitCenter(): THREE.Vector3 {
    return this.group.position.clone().add(new THREE.Vector3(0, 1.05, 0))
  }

  private updateHealthBar(): void {
    const ratio = Math.max(0.05, this.health / this.config.health)
    this.healthFill.scale.x = ratio
  }

  private die(): void {
    this.isDead = true
    this.state.set('dead')
    this.group.rotation.z = Math.PI / 2
    this.group.position.y = 0.22
  }

  private buildFallbackMesh(): void {
    const mat = this.config.classType === 'heavy' ? Materials.enemyHeavy : this.config.classType === 'marksman' ? Materials.enemyMarksman : Materials.enemy
    const radius = this.config.classType === 'heavy' ? 0.46 : 0.38
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(radius, 0.92, 6, 14), mat)
    body.position.y = 0.95
    body.castShadow = true
    const chest = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.42, 0.18), Materials.metal)
    chest.position.set(0, 1.12, -0.22)
    chest.castShadow = true
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 12), mat)
    head.position.y = 1.68
    head.castShadow = true
    const weaponLength = this.config.classType === 'marksman' ? 1.05 : this.config.classType === 'breacher' ? 0.58 : 0.78
    const weapon = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, weaponLength), Materials.metal)
    weapon.position.set(0.25, 1.2, -0.42)
    this.healthFill.position.set(0, 2.05, 0)
    this.group.add(body, chest, head, weapon, this.healthFill)
  }
}
