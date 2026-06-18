import { FIXED_DELTA, MAX_FIXED_STEPS } from './Constants'

type LoopCallbacks = {
  update(delta: number): void
  fixedUpdate(delta: number): void
  render(alpha: number): void
}

export class GameLoop {
  private running = false
  private paused = false
  private last = 0
  private accumulator = 0
  private raf = 0

  constructor(private readonly callbacks: LoopCallbacks) {}

  start(): void {
    if (this.running) return
    this.running = true
    this.last = performance.now()
    this.raf = requestAnimationFrame(this.frame)
  }

  stop(): void {
    this.running = false
    cancelAnimationFrame(this.raf)
  }

  setPaused(paused: boolean): void {
    this.paused = paused
  }

  private frame = (now: number): void => {
    if (!this.running) return
    const rawDelta = (now - this.last) / 1000
    this.last = now

    if (!this.paused) {
      const delta = Math.min(rawDelta, 0.1)
      this.callbacks.update(delta)
      this.accumulator += delta
      let steps = 0
      while (this.accumulator >= FIXED_DELTA && steps < MAX_FIXED_STEPS) {
        this.callbacks.fixedUpdate(FIXED_DELTA)
        this.accumulator -= FIXED_DELTA
        steps++
      }
      this.callbacks.render(this.accumulator / FIXED_DELTA)
    }

    this.raf = requestAnimationFrame(this.frame)
  }
}
