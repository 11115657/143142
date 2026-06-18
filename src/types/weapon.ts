export type WeaponType = 'rifle' | 'pistol' | 'smg' | 'marksman'

export type WeaponConfig = {
  id: string
  displayName: string
  type: WeaponType
  model: string
  magazineSize: number
  reserveAmmo: number
  fireRate: number
  damage: number
  range: number
  reloadTime: number
  adsFov: number
  hipSpread: number
  adsSpread: number
  recoilVertical: number
  recoilHorizontal: number
  automatic: boolean
  armorPenetration: number
  muzzleVelocity: number
  weight: number
}

export type RuntimeWeaponState = {
  ammo: number
  reserve: number
  isReloading: boolean
  isAiming: boolean
  nextFireTime: number
}
