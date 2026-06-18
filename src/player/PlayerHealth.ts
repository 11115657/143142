import { EventBus } from '../core/EventBus'
import { GameConfig } from '../core/Config'

export class PlayerHealth {
  health = GameConfig.player.maxHealth
  armor = GameConfig.player.maxArmor
  medkits = GameConfig.player.medkits
  readonly maxHealth = GameConfig.player.maxHealth
  readonly maxArmor = GameConfig.player.maxArmor

  constructor(private readonly events: EventBus) {}

  damage(amount: number, source = 'enemy'): void {
    if (this.health <= 0) return
    const armorAbsorb = Math.min(this.armor, amount * 0.58)
    this.armor = Math.max(0, this.armor - armorAbsorb)
    const finalDamage = Math.max(1, amount - armorAbsorb * 0.72)
    this.health = Math.max(0, this.health - finalDamage)
    this.events.emit('player:damage', { amount: finalDamage, health: this.health, source })
    if (this.health <= 0) this.events.emit('player:death', undefined)
  }

  heal(amount: number): void {
    this.health = Math.min(this.maxHealth, this.health + amount)
  }

  useMedkit(): boolean {
    if (this.medkits <= 0 || this.health >= this.maxHealth) return false
    this.medkits--
    this.heal(42)
    this.events.emit('ui:toast', { message: '已使用医疗包', tone: 'success' })
    return true
  }

  restoreArmor(amount: number): void {
    this.armor = Math.min(this.maxArmor, this.armor + amount)
  }
}
