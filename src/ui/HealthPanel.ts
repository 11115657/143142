export class HealthPanel {
  private readonly fill = document.querySelector<HTMLElement>('#health-fill')
  private readonly text = document.querySelector<HTMLElement>('#health-text')
  set(health: number, max: number): void {
    const pct = Math.max(0, Math.min(1, health / max))
    if (this.fill) this.fill.style.width = `${pct * 100}%`
    if (this.text) this.text.textContent = `${Math.round(health)} / ${max}`
  }
}
