import * as THREE from 'three'

export class EnemyMovement {
  velocity = new THREE.Vector3()
  strafeSign = Math.random() > 0.5 ? 1 : -1

  moveToward(position: THREE.Vector3, target: THREE.Vector3, speed: number, delta: number): void {
    const to = target.clone().sub(position)
    to.y = 0
    if (to.lengthSq() < 0.05) return
    to.normalize()
    this.velocity.lerp(to.multiplyScalar(speed), Math.min(1, delta * 8))
    position.addScaledVector(this.velocity, delta)
  }

  holdDistance(position: THREE.Vector3, threat: THREE.Vector3, preferredDistance: number, speed: number, delta: number): void {
    const toThreat = threat.clone().sub(position)
    toThreat.y = 0
    const distance = toThreat.length()
    if (distance < 0.01) return
    const forward = toThreat.normalize()
    const right = new THREE.Vector3(forward.z, 0, -forward.x).multiplyScalar(this.strafeSign)
    const correction = distance < preferredDistance * 0.78 ? forward.clone().multiplyScalar(-1) : distance > preferredDistance * 1.35 ? forward : new THREE.Vector3()
    const wish = correction.add(right.multiplyScalar(0.45)).normalize()
    this.velocity.lerp(wish.multiplyScalar(speed * 0.55), Math.min(1, delta * 5))
    position.addScaledVector(this.velocity, delta)
  }
}
