export type HitZone = 'head' | 'torso' | 'limb'

export const HitZoneMultiplier: Record<HitZone, number> = {
  head: 2.4,
  torso: 1,
  limb: 0.65
}
