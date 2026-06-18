import type { QualityPreset } from '../types/game'

export const RenderQualitySettings: Record<QualityPreset, { shadows: boolean; particles: number; enemyCap: number }> = {
  low: { shadows: false, particles: 28, enemyCap: 4 },
  medium: { shadows: true, particles: 48, enemyCap: 6 },
  high: { shadows: true, particles: 80, enemyCap: 8 },
  ultra: { shadows: true, particles: 120, enemyCap: 10 }
}
