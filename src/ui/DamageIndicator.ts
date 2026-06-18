export class DamageIndicator {
  private readonly node = document.querySelector<HTMLElement>('#damage-vignette')
  flash(): void {
    this.node?.classList.add('active')
    window.setTimeout(() => this.node?.classList.remove('active'), 140)
  }
}
