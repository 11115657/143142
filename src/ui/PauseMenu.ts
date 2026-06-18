export class PauseMenu {
  private readonly node = document.querySelector<HTMLElement>('#pause')
  setVisible(visible: boolean): void { this.node?.classList.toggle('hidden', !visible) }
}
