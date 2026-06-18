import * as THREE from 'three'

export class WeaponAnimation {
  private fireKick = 0
  fire(): void { this.fireKick = 1 }
  update(model: THREE.Object3D, delta: number): void {
    this.fireKick *= Math.max(0, 1 - delta * 18)
    model.position.z = -0.55 + this.fireKick * 0.05
    model.rotation.x = -0.03 - this.fireKick * 0.05
  }
}
