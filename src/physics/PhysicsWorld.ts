import * as THREE from 'three'
import type { CollidableBox } from '../types/game'
import { PLAYER_RADIUS, WORLD_GRAVITY } from '../core/Constants'

export type RayHit = {
  id: string
  point: THREE.Vector3
  distance: number
  object?: THREE.Object3D
}

export class PhysicsWorld {
  readonly colliders: CollidableBox[] = []
  gravity = WORLD_GRAVITY

  addBox(id: string, center: THREE.Vector3, half: THREE.Vector3, object?: THREE.Object3D): void {
    this.colliders.push({ id, center: center.clone(), half: half.clone(), object })
  }

  clear(): void {
    this.colliders.length = 0
  }

  resolvePlayer(position: THREE.Vector3, velocity: THREE.Vector3): void {
    for (const collider of this.colliders) {
      if (position.y < -20) {
        position.set(0, 2, 8)
        velocity.set(0, 0, 0)
      }
      const minX = collider.center.x - collider.half.x - PLAYER_RADIUS
      const maxX = collider.center.x + collider.half.x + PLAYER_RADIUS
      const minZ = collider.center.z - collider.half.z - PLAYER_RADIUS
      const maxZ = collider.center.z + collider.half.z + PLAYER_RADIUS
      const withinY = position.y > collider.center.y - collider.half.y - 0.1 && position.y < collider.center.y + collider.half.y + 2.1
      if (!withinY) continue
      if (position.x > minX && position.x < maxX && position.z > minZ && position.z < maxZ) {
        const dxMin = Math.abs(position.x - minX)
        const dxMax = Math.abs(maxX - position.x)
        const dzMin = Math.abs(position.z - minZ)
        const dzMax = Math.abs(maxZ - position.z)
        const min = Math.min(dxMin, dxMax, dzMin, dzMax)
        if (min === dxMin) { position.x = minX; velocity.x = Math.min(0, velocity.x) }
        else if (min === dxMax) { position.x = maxX; velocity.x = Math.max(0, velocity.x) }
        else if (min === dzMin) { position.z = minZ; velocity.z = Math.min(0, velocity.z) }
        else { position.z = maxZ; velocity.z = Math.max(0, velocity.z) }
      }
    }
  }

  raycast(origin: THREE.Vector3, direction: THREE.Vector3, maxDistance: number): RayHit | null {
    let best: RayHit | null = null
    const ray = new THREE.Ray(origin, direction.clone().normalize())
    for (const collider of this.colliders) {
      const box = new THREE.Box3(
        collider.center.clone().sub(collider.half),
        collider.center.clone().add(collider.half)
      )
      const point = new THREE.Vector3()
      const hit = ray.intersectBox(box, point)
      if (!hit) continue
      const distance = origin.distanceTo(point)
      if (distance <= maxDistance && (!best || distance < best.distance)) {
        best = { id: collider.id, point: point.clone(), distance, object: collider.object }
      }
    }
    return best
  }

  isGrounded(position: THREE.Vector3): boolean {
    return position.y <= 0.02
  }
}
