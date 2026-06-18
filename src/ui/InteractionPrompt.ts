export class InteractionPrompt {
  private readonly node = document.querySelector<HTMLElement>('#interaction')
  setVisible(visible: boolean, text = '按 F 交互'): void {
    if (!this.node) return
    this.node.textContent = text
    this.node.classList.toggle('hidden', !visible)
  }
}
