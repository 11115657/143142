import * as THREE from 'three'

export class MuzzleFlash {
  readonly light = new THREE.PointLight(0xffd28a, 0, 6)
  private timer = 0

  trigger(position: THREE.Vector3): void {
    this.light.position.copy(position)
    this.light.intensity = 4
    this.timer = 0.045
  }

  update(delta: number): void {
    if (this.timer <= 0) { this.light.intensity = 0; return }
    this.timer -= delta
    this.light.intensity *= 0.42
  }
}
