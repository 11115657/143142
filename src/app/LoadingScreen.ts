export class LoadingScreen {
  private readonly root = document.querySelector<HTMLElement>('#loading')
  private readonly bar = document.querySelector<HTMLElement>('#loading-bar')
  private readonly text = document.querySelector<HTMLElement>('#loading-text')

  set(label: string, progress: number): void {
    if (this.bar) this.bar.style.width = `${Math.round(progress * 100)}%`
    if (this.text) this.text.textContent = label
  }

  hide(): void {
    this.root?.classList.add('hidden')
  }
}
