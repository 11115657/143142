import type { InputState } from '../input/InputManager'
import type { CharacterController } from '../physics/CharacterController'
import type { PhysicsWorld } from '../physics/PhysicsWorld'
import { GameConfig } from '../core/Config'

export class PlayerMovement {
  constructor(private readonly controller: CharacterController, private readonly physics: PhysicsWorld) {}

  update(input: InputState, delta: number, aim: boolean): void {
    const sensitivity = GameConfig.mouseSensitivity * (aim ? GameConfig.aimSensitivityMultiplier : 1)
    this.controller.updateLook(input, sensitivity)
    this.controller.updateMovement(input, delta, this.physics)
  }
}
