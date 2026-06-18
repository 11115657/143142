import type { Player } from '../player/Player'
import type { EnemyConfig } from '../types/enemy'

export class EnemyCombat {
  private cooldown = 0
  private burstRemaining = 0

  constructor(private readonly config: EnemyConfig) {}

  update(delta: number, player: Player, distance: number, hasLineOfSight: boolean): boolean {
    this.cooldown -= delta
    if (!hasLineOfSight || this.cooldown > 0) return false

    if (this.burstRemaining <= 0) this.burstRemaining = this.config.burstSize
    this.burstRemaining--
    const distancePenalty = Math.min(0.46, distance / Math.max(1, this.config.attackRange) * 0.32)
    const movementPenalty = player.state.isSprinting ? 0.12 : 0
    const hitChance = Math.max(0.12, this.config.accuracy - distancePenalty - movementPenalty)
    if (Math.random() < hitChance) player.health.damage(this.config.damage, this.config.id)

    const burstDelay = this.burstRemaining > 0 ? 0.12 + Math.random() * 0.08 : this.config.fireInterval * (0.82 + Math.random() * 0.5)
    this.cooldown = burstDelay
    return true
  }
}
