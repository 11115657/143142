export class AimDownSight {
  amount = 0
  update(delta: number, aiming: boolean): void {
    this.amount += ((aiming ? 1 : 0) - this.amount) * Math.min(1, delta * 12)
  }
}
