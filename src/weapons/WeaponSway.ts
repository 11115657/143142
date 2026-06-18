import * as THREE from 'three'

export class WeaponSway {
  update(model: THREE.Object3D, time: number, moving: boolean, aiming: boolean): void {
    const scale = aiming ? 0.2 : moving ? 0.65 : 0.32
    model.position.x = 0.34 + Math.sin(time * 3.1) * 0.018 * scale
    model.position.y = -0.28 + Math.sin(time * 4.5) * 0.012 * scale
  }
}
