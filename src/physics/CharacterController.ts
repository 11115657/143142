import * as THREE from 'three'
import { GameConfig } from '../core/Config'
import type { InputState } from '../input/InputManager'
import type { PhysicsWorld } from './PhysicsWorld'

export class CharacterController {
  readonly position = new THREE.Vector3(0, 0, 8)
  readonly velocity = new THREE.Vector3()
  yaw = Math.PI
  pitch = 0
  grounded = true

  updateLook(input: InputState, sensitivity: number): void {
    this.yaw -= input.mouseDeltaX * sensitivity
    this.pitch -= input.mouseDeltaY * sensitivity
    this.pitch = THREE.MathUtils.clamp(this.pitch, -1.45, 1.45)
  }

  updateMovement(input: InputState, delta: number, physics: PhysicsWorld): void {
    const forward = new THREE.Vector3(Math.sin(this.yaw), 0, Math.cos(this.yaw))
    const right = new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw))
    const wish = new THREE.Vector3()
    if (input.moveForward) wish.add(forward)
    if (input.moveBackward) wish.sub(forward)
    if (input.moveRight) wish.add(right)
    if (input.moveLeft) wish.sub(right)
    if (wish.lengthSq() > 0) wish.normalize()

    const speed = input.crouch ? GameConfig.player.crouchSpeed : input.sprint ? GameConfig.player.sprintSpeed : GameConfig.player.walkSpeed
    const target = wish.multiplyScalar(speed)
    const accel = wish.lengthSq() > 0 ? GameConfig.player.acceleration : GameConfig.player.friction
    this.velocity.x += (target.x - this.velocity.x) * Math.min(1, accel * delta)
    this.velocity.z += (target.z - this.velocity.z) * Math.min(1, accel * delta)

    this.grounded = physics.isGrounded(this.position)
    if (this.grounded) {
      this.position.y = 0
      if (this.velocity.y < 0) this.velocity.y = 0
      if (input.jump && !input.crouch) this.velocity.y = GameConfig.player.jumpVelocity
    } else {
      this.velocity.y += physics.gravity * delta
    }

    this.position.addScaledVector(this.velocity, delta)
    if (this.position.y < 0) this.position.y = 0
    physics.resolvePlayer(this.position, this.velocity)
  }

  direction(): THREE.Vector3 {
    return new THREE.Vector3(Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), Math.cos(this.yaw) * Math.cos(this.pitch)).normalize()
  }
}
