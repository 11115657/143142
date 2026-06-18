import { AudioManager } from './AudioManager'

export class FootstepAudio {
  private timer = 0
  constructor(private readonly audio: AudioManager) {}
  update(delta: number, moving: boolean, sprinting: boolean): void {
    if (!moving) { this.timer = 0; return }
    this.timer -= delta
    if (this.timer <= 0) {
      this.audio.beep(140, 0.03, 0.015)
      this.timer = sprinting ? 0.32 : 0.48
    }
  }
}
