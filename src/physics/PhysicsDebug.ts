import * as THREE from 'three'
import type { PhysicsWorld } from './PhysicsWorld'

export class PhysicsDebug {
  readonly group = new THREE.Group()
  private helpers: THREE.Box3Helper[] = []

  rebuild(world: PhysicsWorld): void {
    this.group.clear()
    this.helpers = world.colliders.map((box) => {
      const helper = new THREE.Box3Helper(new THREE.Box3(box.center.clone().sub(box.half), box.center.clone().add(box.half)), 0x00ffff)
      this.group.add(helper)
      return helper
    })
  }
}
