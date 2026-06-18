export class ScreenShake {
  amount = 0
  add(value: number): void { this.amount = Math.max(this.amount, value) }
  update(delta: number): number { this.amount *= Math.max(0, 1 - delta * 8); return this.amount }
}
