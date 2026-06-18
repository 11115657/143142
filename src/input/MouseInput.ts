export class MouseInput {
  deltaX = 0
  deltaY = 0
  left = false
  right = false
  leftPressed = false
  rightPressed = false

  constructor(private readonly target: HTMLElement) {
    target.addEventListener('mousemove', this.onMouseMove)
    target.addEventListener('mousedown', this.onMouseDown)
    target.addEventListener('mouseup', this.onMouseUp)
    target.addEventListener('contextmenu', this.onContextMenu)
  }

  endFrame(): void {
    this.deltaX = 0
    this.deltaY = 0
    this.leftPressed = false
    this.rightPressed = false
  }

  dispose(): void {
    this.target.removeEventListener('mousemove', this.onMouseMove)
    this.target.removeEventListener('mousedown', this.onMouseDown)
    this.target.removeEventListener('mouseup', this.onMouseUp)
    this.target.removeEventListener('contextmenu', this.onContextMenu)
  }

  private onMouseMove = (event: MouseEvent): void => {
    if (document.pointerLockElement !== this.target) return
    this.deltaX += event.movementX
    this.deltaY += event.movementY
  }

  private onMouseDown = (event: MouseEvent): void => {
    if (event.button === 0) {
      if (!this.left) this.leftPressed = true
      this.left = true
    }
    if (event.button === 2) {
      if (!this.right) this.rightPressed = true
      this.right = true
    }
  }

  private onMouseUp = (event: MouseEvent): void => {
    if (event.button === 0) this.left = false
    if (event.button === 2) this.right = false
  }

  private onContextMenu = (event: MouseEvent): void => event.preventDefault()
}
