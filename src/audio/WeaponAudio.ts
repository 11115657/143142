import { AudioManager } from './AudioManager'

export class WeaponAudio {
  constructor(private readonly audio: AudioManager) {}
  fire(): void { this.audio.beep(82, 0.045, 0.07) }
  empty(): void { this.audio.beep(650, 0.035, 0.035) }
  reload(): void { this.audio.beep(320, 0.12, 0.045) }
}
