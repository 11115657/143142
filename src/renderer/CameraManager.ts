import * as THREE from 'three'

export class CameraManager {
  readonly camera = new THREE.PerspectiveCamera(72, window.innerWidth / window.innerHeight, 0.05, 500)

  constructor() {
    this.camera.position.set(0, 1.7, 4)
  }

  resize(width: number, height: number): void {
    this.camera.aspect = width / Math.max(1, height)
    this.camera.updateProjectionMatrix()
  }

  setFov(fov: number): void {
    this.camera.fov += (fov - this.camera.fov) * 0.18
    this.camera.updateProjectionMatrix()
  }
}
