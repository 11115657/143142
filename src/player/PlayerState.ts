import { GameConfig } from '../core/Config'

export type PlayerStance = 'standing' | 'crouching'
export type PlayerLifeState = 'alive' | 'dead'

export class PlayerState {
  stance: PlayerStance = 'standing'
  life: PlayerLifeState = 'alive'
  isAiming = false
  isSprinting = false
  stamina = GameConfig.player.maxStamina
  readonly maxStamina = GameConfig.player.maxStamina
  private regenDelay = 0

  spendStamina(amount: number): boolean {
    if (this.stamina < amount) return false
    this.stamina -= amount
    this.regenDelay = GameConfig.player.staminaRegenDelay
    return true
  }

  updateStamina(delta: number, sprinting: boolean): void {
    if (sprinting) {
      this.stamina = Math.max(0, this.stamina - GameConfig.player.staminaDrainSprint * delta)
      this.regenDelay = GameConfig.player.staminaRegenDelay
      return
    }
    this.regenDelay -= delta
    if (this.regenDelay <= 0) {
      this.stamina = Math.min(this.maxStamina, this.stamina + GameConfig.player.staminaRegen * delta)
    }
  }
}
