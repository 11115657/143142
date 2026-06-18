export class BlendTree {
  value = 0
  update(target: number, delta: number): void { this.value += (target - this.value) * Math.min(1, delta * 8) }
}
