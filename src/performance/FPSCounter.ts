export class FPSCounter {
  fps = 0
  private frames = 0
  private elapsed = 0
  update(delta: number): number {
    this.frames++
    this.elapsed += delta
    if (this.elapsed >= 0.5) { this.fps = Math.round(this.frames / this.elapsed); this.frames = 0; this.elapsed = 0 }
    return this.fps
  }
}
