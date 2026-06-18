export class GamepadInput {
  getPrimaryGamepad(): Gamepad | null {
    return navigator.getGamepads().find(Boolean) ?? null
  }
}
