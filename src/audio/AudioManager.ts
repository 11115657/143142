export class AudioManager {
  private unlocked = false

  constructor() {
    window.addEventListener('pointerdown', () => { this.unlocked = true }, { once: true })
  }

  beep(frequency = 220, duration = 0.06, gain = 0.05): void {
    if (!this.unlocked) return
    const context = new AudioContext()
    const osc = context.createOscillator()
    const amp = context.createGain()
    osc.frequency.value = frequency
    amp.gain.value = gain
    osc.connect(amp).connect(context.destination)
    osc.start()
    osc.stop(context.currentTime + duration)
    osc.onended = () => void context.close()
  }
}
