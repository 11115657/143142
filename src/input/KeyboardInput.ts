export class KeyboardInput {
  private keys = new Set<string>()
  private pressedThisFrame = new Set<string>()

  constructor() {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  isDown(code: string): boolean {
    return this.keys.has(code)
  }

  wasPressed(code: string): boolean {
    return this.pressedThisFrame.has(code)
  }

  endFrame(): void {
    this.pressedThisFrame.clear()
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  private onKeyDown = (event: KeyboardEvent): void => {
    if (!this.keys.has(event.code)) this.pressedThisFrame.add(event.code)
    this.keys.add(event.code)
    if (['Space', 'Tab'].includes(event.code)) event.preventDefault()
  }

  private onKeyUp = (event: KeyboardEvent): void => {
    this.keys.delete(event.code)
  }
}
