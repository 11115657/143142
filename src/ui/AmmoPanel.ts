export class AmmoPanel {
  private readonly ammo = document.querySelector<HTMLElement>('#ammo')
  private readonly weapon = document.querySelector<HTMLElement>('#weapon-name')
  set(weaponName: string, current: number, reserve: number): void {
    if (this.weapon) this.weapon.textContent = weaponName
    if (this.ammo) this.ammo.textContent = `${current} / ${reserve}`
  }
}
