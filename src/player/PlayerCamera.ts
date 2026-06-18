import * as THREE from 'three'
import { PLAYER_CROUCH_EYE_HEIGHT, PLAYER_EYE_HEIGHT } from '../core/Constants'
import type { CharacterController } from '../physics/CharacterController'

export class PlayerCamera {
  private recoilPitch = 0
  private shake = 0

  constructor(private readonly camera: THREE.PerspectiveCamera, private readonly controller: CharacterController) {}

  addRecoil(amount: number): void {
    this.recoilPitch += amount
  }

  addShake(amount: number): void {
    this.shake = Math.max(this.shake, amount)
  }

  update(delta: number, crouching: boolean): void {
    this.recoilPitch *= Math.max(0, 1 - delta * 8)
    this.shake *= Math.max(0, 1 - delta * 9)
    const eye = crouching ? PLAYER_CROUCH_EYE_HEIGHT : PLAYER_EYE_HEIGHT
    const shakeX = (Math.random() - 0.5) * this.shake
    const shakeY = (Math.random() - 0.5) * this.shake
    this.camera.position.copy(this.controller.position).add(new THREE.Vector3(shakeX, eye + shakeY, 0))
    this.camera.rotation.set(this.controller.pitch - this.recoilPitch, this.controller.yaw, 0, 'YXZ')
  }
}
