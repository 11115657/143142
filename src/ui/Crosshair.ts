export class Crosshair {
  private readonly hit = document.querySelector<HTMLElement>('#hitmarker')
  showHit(): void {
    this.hit?.classList.remove('hidden')
    window.setTimeout(() => this.hit?.classList.add('hidden'), 90)
  }
}
