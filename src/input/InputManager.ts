import { KeyboardInput } from './KeyboardInput'
import { MouseInput } from './MouseInput'
import { PointerLock } from './PointerLock'
import { GamepadInput } from './GamepadInput'
import { InputBindings, type InputAction } from './InputBindings'
import { EventBus } from '../core/EventBus'

export type InputState = {
  moveForward: boolean
  moveBackward: boolean
  moveLeft: boolean
  moveRight: boolean
  sprint: boolean
  crouch: boolean
  jump: boolean
  reload: boolean
  interact: boolean
  debug: boolean
  fire: boolean
  firePressed: boolean
  aim: boolean
  mouseDeltaX: number
  mouseDeltaY: number
  weapon1: boolean
  weapon2: boolean
  weapon3: boolean
  medkit: boolean
  grenade: boolean
  flashlight: boolean
}

export class InputManager {
  readonly keyboard = new KeyboardInput()
  readonly mouse: MouseInput
  readonly pointerLock: PointerLock
  readonly gamepad = new GamepadInput()

  constructor(target: HTMLElement, events: EventBus) {
    this.mouse = new MouseInput(target)
    this.pointerLock = new PointerLock(target, events)
  }

  read(): InputState {
    return {
      moveForward: this.actionDown('moveForward'),
      moveBackward: this.actionDown('moveBackward'),
      moveLeft: this.actionDown('moveLeft'),
      moveRight: this.actionDown('moveRight'),
      sprint: this.actionDown('sprint'),
      crouch: this.actionDown('crouch'),
      jump: this.actionPressed('jump'),
      reload: this.actionPressed('reload'),
      interact: this.actionPressed('interact'),
      debug: this.actionPressed('debug'),
      fire: this.pointerLock.isLocked && this.mouse.left,
      firePressed: this.pointerLock.isLocked && this.mouse.leftPressed,
      aim: this.pointerLock.isLocked && this.mouse.right,
      mouseDeltaX: this.pointerLock.isLocked ? this.mouse.deltaX : 0,
      mouseDeltaY: this.pointerLock.isLocked ? this.mouse.deltaY : 0,
      weapon1: this.actionPressed('weapon1'),
      weapon2: this.actionPressed('weapon2'),
      weapon3: this.actionPressed('weapon3'),
      medkit: this.actionPressed('medkit'),
      grenade: this.actionPressed('grenade'),
      flashlight: this.actionPressed('flashlight')
    }
  }

  endFrame(): void {
    this.keyboard.endFrame()
    this.mouse.endFrame()
  }

  dispose(): void {
    this.keyboard.dispose()
    this.mouse.dispose()
    this.pointerLock.dispose()
  }

  private actionDown(action: InputAction): boolean {
    return InputBindings[action].some((code) => this.keyboard.isDown(code))
  }

  private actionPressed(action: InputAction): boolean {
    return InputBindings[action].some((code) => this.keyboard.wasPressed(code))
  }
}
