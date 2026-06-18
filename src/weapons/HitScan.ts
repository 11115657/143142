import * as THREE from 'three'
import type { Enemy } from '../ai/Enemy'
import type { PhysicsWorld } from '../physics/PhysicsWorld'
import { raySphere } from '../combat/HitDetection'
import { DamageSystem } from '../combat/DamageSystem'
import type { WeaponConfig } from '../types/weapon'

export type HitScanResult =
  | { kind: 'enemy'; enemy: Enemy; point: THREE.Vector3; damage: number; distance: number; killed: boolean; hitZone: 'head' | 'torso' | 'limb' }
  | { kind: 'world'; point: THREE.Vector3; normal: THREE.Vector3; distance: number }
  | { kind: 'miss'; point: THREE.Vector3 }

export class HitScan {
  static fire(origin: THREE.Vector3, direction: THREE.Vector3, config: WeaponConfig, enemies: Enemy[], physics: PhysicsWorld, spreadDegrees: number): HitScanResult {
    const spread = THREE.MathUtils.degToRad(spreadDegrees)
    const dir = direction.clone()
    dir.x += (Math.random() - 0.5) * spread
    dir.y += (Math.random() - 0.5) * spread
    dir.z += (Math.random() - 0.5) * spread
    dir.normalize()

    const worldHit = physics.raycast(origin, dir, config.range)
    const bestWorldDistance = worldHit?.distance ?? Infinity
    let bestEnemy: { enemy: Enemy; distance: number; zone: 'head' | 'torso' | 'limb' } | null = null
    for (const enemy of enemies) {
      if (enemy.isDead) continue
      const headDistance = raySphere(origin, dir, { id: enemy.id, center: enemy.group.position.clone().add(new THREE.Vector3(0, 1.65, 0)), radius: 0.26 }, config.range)
      const torsoDistance = raySphere(origin, dir, { id: enemy.id, center: enemy.hitCenter(), radius: 0.7 }, config.range)
      const limbDistance = raySphere(origin, dir, { id: enemy.id, center: enemy.group.position.clone().add(new THREE.Vector3(0, 0.72, 0)), radius: 0.52 }, config.range)
      const candidates: Array<[number | null, 'head' | 'torso' | 'limb']> = [[headDistance, 'head'], [torsoDistance, 'torso'], [limbDistance, 'limb']]
      for (const [distance, zone] of candidates) {
        if (distance !== null && distance < bestWorldDistance && (!bestEnemy || distance < bestEnemy.distance)) bestEnemy = { enemy, distance, zone }
      }
    }

    if (bestEnemy) {
      const point = origin.clone().addScaledVector(dir, bestEnemy.distance)
      const damage = DamageSystem.calculate(config.damage, bestEnemy.distance, config.range, bestEnemy.zone)
      const killed = bestEnemy.enemy.damage(damage, bestEnemy.zone, config.armorPenetration)
      return { kind: 'enemy', enemy: bestEnemy.enemy, point, damage, distance: bestEnemy.distance, killed, hitZone: bestEnemy.zone }
    }

    if (worldHit) return { kind: 'world', point: worldHit.point, normal: dir.clone().negate().normalize(), distance: worldHit.distance }
    return { kind: 'miss', point: origin.clone().addScaledVector(dir, config.range) }
  }
}
