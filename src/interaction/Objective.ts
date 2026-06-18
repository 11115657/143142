import type { Interactable } from './Interactable'

export class Objective implements Interactable {
  completed = false
  constructor(readonly id: string, readonly label: string) {}
  interact(): void { this.completed = true }
}
