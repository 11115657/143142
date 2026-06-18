import type { HitZone } from './HitZones'
import { HitZoneMultiplier } from './HitZones'

export class DamageSystem {
  static calculate(baseDamage: number, distance: number, range: number, zone: HitZone = 'torso'): number {
    const falloff = Math.max(0.55, 1 - Math.max(0, distance - range * 0.35) / range)
    return Math.round(baseDamage * falloff * HitZoneMultiplier[zone])
  }
}
