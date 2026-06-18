export class Time {
  delta = 0
  elapsed = 0
  frame = 0
  fps = 0
  private fpsAccumulator = 0
  private fpsFrames = 0

  tick(delta: number): void {
    this.delta = Math.min(delta, 0.1)
    this.elapsed += this.delta
    this.frame++
    this.fpsAccumulator += this.delta
    this.fpsFrames++
    if (this.fpsAccumulator >= 0.5) {
      this.fps = Math.round(this.fpsFrames / this.fpsAccumulator)
      this.fpsAccumulator = 0
      this.fpsFrames = 0
    }
  }
}
