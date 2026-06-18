import type * as THREE from 'three'
import { EventBus } from '../core/EventBus'
import type { InputState } from '../input/InputManager'
import type { PhysicsWorld } from '../physics/PhysicsWorld'
import type { Level } from '../scene/Level'
import { PlayerController } from './PlayerController'
import { PlayerMovement } from './PlayerMovement'
import { PlayerCamera } from './PlayerCamera'
import { PlayerHealth } from './PlayerHealth'
import { PlayerState } from './PlayerState'
import { PlayerInteraction } from './PlayerInteraction'
import { GameConfig } from '../core/Config'

export class Player {
  readonly controller = new PlayerController()
  readonly state = new PlayerState()
  readonly health: PlayerHealth
  readonly movement: PlayerMovement
  readonly cameraRig: PlayerCamera
  readonly interaction: PlayerInteraction

  constructor(camera: THREE.PerspectiveCamera, physics: PhysicsWorld, events: EventBus) {
    this.health = new PlayerHealth(events)
    this.movement = new PlayerMovement(this.controller, physics)
    this.cameraRig = new PlayerCamera(camera, this.controller)
    this.interaction = new PlayerInteraction(camera, events)
  }

  update(input: InputState, delta: number, level: Level, aiming: boolean): void {
    const moving = input.moveForward || input.moveBackward || input.moveLeft || input.moveRight
    const canSprint = input.sprint && moving && !aiming && !input.crouch && this.state.stamina > 4
    const effectiveInput: InputState = { ...input, sprint: canSprint }
    if (input.jump && this.controller.grounded && !input.crouch) {
      if (!this.state.spendStamina(GameConfig.player.staminaDrainJump)) effectiveInput.jump = false
    }
    if (input.medkit) this.health.useMedkit()
    this.state.stance = input.crouch ? 'crouching' : 'standing'
    this.state.isAiming = aiming
    this.state.isSprinting = canSprint
    this.state.updateStamina(delta, canSprint)
    this.movement.update(effectiveInput, delta, aiming)
    this.cameraRig.update(delta, input.crouch)
    this.interaction.update(input, level)
  }
}
