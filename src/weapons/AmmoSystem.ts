import type { RuntimeWeaponState, WeaponConfig } from '../types/weapon'

export class AmmoSystem {
  static createState(config: WeaponConfig): RuntimeWeaponState {
    return { ammo: config.magazineSize, reserve: config.reserveAmmo, isReloading: false, isAiming: false, nextFireTime: 0 }
  }

  static reload(config: WeaponConfig, state: RuntimeWeaponState): void {
    const need = config.magazineSize - state.ammo
    const take = Math.min(need, state.reserve)
    state.ammo += take
    state.reserve -= take
  }
}
