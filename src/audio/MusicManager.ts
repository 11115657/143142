export class MusicManager {
  intensity = 0
  setCombatIntensity(value: number): void { this.intensity = Math.max(0, Math.min(1, value)) }
}
