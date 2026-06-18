import * as THREE from 'three'
import type { PhysicsWorld } from '../physics/PhysicsWorld'

export class EnemyPerception {
  alertness = 0
  constructor(private readonly detectionRange: number) {}

  canSee(enemyPosition: THREE.Vector3, playerPosition: THREE.Vector3, physics: PhysicsWorld): boolean {
    const origin = enemyPosition.clone().add(new THREE.Vector3(0, 1.35, 0))
    const target = playerPosition.clone().add(new THREE.Vector3(0, 1.3, 0))
    const toPlayer = target.clone().sub(origin)
    const distance = toPlayer.length()
    if (distance > this.detectionRange + this.alertness * 10) return false
    const dir = toPlayer.normalize()
    const hit = physics.raycast(origin, dir, distance)
    if (hit && hit.distance < distance - 0.8) return false
    return true
  }

  hearNoise(enemyPosition: THREE.Vector3, noisePosition: THREE.Vector3, radius: number): boolean {
    return enemyPosition.distanceTo(noisePosition) <= radius
  }

  raiseAlert(amount = 1): void {
    this.alertness = Math.min(1, this.alertness + amount)
  }

  update(delta: number): void {
    this.alertness = Math.max(0, this.alertness - delta * 0.035)
  }
}
