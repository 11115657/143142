import type { RuntimeWeaponState, WeaponConfig } from '../types/weapon'

export class FireControl {
  static canFire(config: WeaponConfig, state: RuntimeWeaponState, now: number, triggerDown: boolean, triggerPressed: boolean): boolean {
    if (state.isReloading || state.ammo <= 0 || now < state.nextFireTime) return false
    if (config.automatic) return triggerDown
    return triggerPressed
  }

  static consume(config: WeaponConfig, state: RuntimeWeaponState, now: number): void {
    state.ammo--
    state.nextFireTime = now + 60 / config.fireRate
  }
}
