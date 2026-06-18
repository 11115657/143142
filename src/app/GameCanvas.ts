export class GameCanvas {
  readonly canvas: HTMLCanvasElement

  constructor() {
    const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')
    if (!canvas) throw new Error('找不到 #game-canvas')
    this.canvas = canvas
    this.canvas.tabIndex = 0
  }
}
