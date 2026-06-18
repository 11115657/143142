export const InputBindings = {
  moveForward: ['KeyW'],
  moveBackward: ['KeyS'],
  moveLeft: ['KeyA'],
  moveRight: ['KeyD'],
  sprint: ['ShiftLeft', 'ShiftRight'],
  crouch: ['ControlLeft', 'ControlRight'],
  jump: ['Space'],
  reload: ['KeyR'],
  interact: ['KeyF'],
  debug: ['Tab'],
  medkit: ['KeyX'],
  grenade: ['KeyG'],
  flashlight: ['KeyT'],
  weapon1: ['Digit1'],
  weapon2: ['Digit2'],
  weapon3: ['Digit3']
} as const

export type InputAction = keyof typeof InputBindings
