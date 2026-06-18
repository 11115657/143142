import type { WeaponConfig } from '../types/weapon'

export class RecoilSystem {
  currentKick = 0
  add(config: WeaponConfig): number {
    const kick = config.recoilVertical * (0.85 + Math.random() * 0.3)
    this.currentKick += kick
    return kick
  }
  update(delta: number): void { this.currentKick *= Math.max(0, 1 - delta * 9) }
}
