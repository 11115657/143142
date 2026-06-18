export class StatusPanel {
  private readonly armorFill = document.querySelector<HTMLElement>('#armor-fill')
  private readonly armorText = document.querySelector<HTMLElement>('#armor-text')
  private readonly staminaFill = document.querySelector<HTMLElement>('#stamina-fill')
  private readonly staminaText = document.querySelector<HTMLElement>('#stamina-text')
  private readonly kitText = document.querySelector<HTMLElement>('#kit-text')

  set(armor: number, maxArmor: number, stamina: number, maxStamina: number, medkits: number, grenades: number): void {
    const armorRatio = maxArmor <= 0 ? 0 : armor / maxArmor
    const staminaRatio = maxStamina <= 0 ? 0 : stamina / maxStamina
    if (this.armorFill) this.armorFill.style.width = `${Math.max(0, Math.min(1, armorRatio)) * 100}%`
    if (this.armorText) this.armorText.textContent = `护甲 ${Math.round(armor)} / ${maxArmor}`
    if (this.staminaFill) this.staminaFill.style.width = `${Math.max(0, Math.min(1, staminaRatio)) * 100}%`
    if (this.staminaText) this.staminaText.textContent = `体力 ${Math.round(stamina)} / ${maxStamina}`
    if (this.kitText) this.kitText.textContent = `X 医疗包 ${medkits}   G 手雷 ${grenades}`
  }
}
