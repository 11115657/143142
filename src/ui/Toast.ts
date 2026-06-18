export class Toast {
  private readonly node = document.querySelector<HTMLElement>('#toast')
  show(message: string): void {
    if (!this.node) return
    this.node.textContent = message
    this.node.classList.remove('hidden')
    window.setTimeout(() => this.node?.classList.add('hidden'), 1800)
  }
}
