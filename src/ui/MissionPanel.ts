export class MissionPanel {
  private readonly title = document.querySelector<HTMLElement>('#mission-title')
  private readonly objective = document.querySelector<HTMLElement>('#mission-objective')
  set(title: string, objective: string): void {
    if (this.title) this.title.textContent = title
    if (this.objective) this.objective.textContent = objective
  }
}
