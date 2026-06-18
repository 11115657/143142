import * as THREE from 'three'
import type { Enemy } from '../ai/Enemy'
import type { Player } from '../player/Player'
import type { EffectsManager } from '../effects/EffectsManager'
import type { EventBus } from '../core/EventBus'
import { Materials } from '../renderer/Materials'

class GrenadeProjectile {
  readonly mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16, 1), Materials.grenade)
  velocity: THREE.Vector3
  fuse = 2.4

  constructor(position: THREE.Vector3, direction: THREE.Vector3) {
    this.mesh.position.copy(position)
    this.velocity = direction.clone().multiplyScalar(16).add(new THREE.Vector3(0, 4.6, 0))
    this.mesh.castShadow = true
  }

  update(delta: number): void {
    this.velocity.y -= 9.81 * delta
    this.mesh.position.addScaledVector(this.velocity, delta)
    if (this.mesh.position.y < 0.18) {
      this.mesh.position.y = 0.18
      this.velocity.y = Math.abs(this.velocity.y) * 0.34
      this.velocity.x *= 0.72
      this.velocity.z *= 0.72
    }
    this.mesh.rotation.x += delta * 11
    this.mesh.rotation.y += delta * 7
    this.fuse -= delta
  }
}

export class GrenadeSystem {
  readonly group = new THREE.Group()
  private grenades: GrenadeProjectile[] = []
  count = 3

  constructor(
    private readonly scene: THREE.Scene,
    private readonly effects: EffectsManager,
    private readonly events: EventBus
  ) {
    scene.add(this.group)
  }

  throwFrom(camera: THREE.Camera): boolean {
    if (this.count <= 0) return false
    this.count--
    const origin = new THREE.Vector3()
    const dir = new THREE.Vector3()
    camera.getWorldPosition(origin)
    camera.getWorldDirection(dir)
    const grenade = new GrenadeProjectile(origin.addScaledVector(dir, 0.8).add(new THREE.Vector3(0, -0.15, 0)), dir)
    this.grenades.push(grenade)
    this.group.add(grenade.mesh)
    this.events.emit('ui:toast', { message: '破片手雷已投掷', tone: 'info' })
    return true
  }

  update(delta: number, enemies: Enemy[], player: Player): void {
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const grenade = this.grenades[i]
      grenade.update(delta)
      if (grenade.fuse <= 0) {
        this.explode(grenade.mesh.position.clone(), enemies, player)
        this.group.remove(grenade.mesh)
        grenade.mesh.geometry.dispose()
        ;(grenade.mesh.material as THREE.Material).dispose?.()
        this.grenades.splice(i, 1)
      }
    }
  }

  private explode(position: THREE.Vector3, enemies: Enemy[], player: Player): void {
    const radius = 7.2
    for (let i = 0; i < 34; i++) this.effects.impact.spawn(position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, Math.random() * 1.2, (Math.random() - 0.5) * 2)))
    this.effects.screenShake.add(0.65)
    for (const enemy of enemies) {
      if (enemy.isDead) continue
      const distance = enemy.group.position.distanceTo(position)
      if (distance <= radius) {
        const damage = Math.round(110 * Math.pow(1 - distance / radius, 1.4))
        const killed = enemy.damage(damage, 'torso', 0.8)
        this.events.emit('combat:hit', { targetId: enemy.id, damage, isKill: killed })
        if (killed) this.events.emit('enemy:death', { id: enemy.id })
      }
    }
    const playerDistance = player.controller.position.distanceTo(position)
    if (playerDistance <= radius) player.health.damage(Math.round(80 * Math.pow(1 - playerDistance / radius, 1.2)), 'grenade')
    this.events.emit('ui:toast', { message: '爆炸冲击', tone: 'danger' })
  }
}
