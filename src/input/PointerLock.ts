import { EventBus } from '../core/EventBus'

export class PointerLock {
  isLocked = false

  constructor(private readonly target: HTMLElement, private readonly events: EventBus) {
    target.addEventListener('click', this.request)
    document.addEventListener('pointerlockchange', this.onPointerLockChange)
  }

  request = (): void => {
    if (document.pointerLockElement !== this.target) void this.target.requestPointerLock()
  }

  exit(): void {
    if (document.pointerLockElement === this.target) document.exitPointerLock()
  }

  dispose(): void {
    this.target.removeEventListener('click', this.request)
    document.removeEventListener('pointerlockchange', this.onPointerLockChange)
  }

  private onPointerLockChange = (): void => {
    this.isLocked = document.pointerLockElement === this.target
    this.events.emit(this.isLocked ? 'game:resume' : 'game:pause', undefined)
  }
}
