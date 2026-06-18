import type { Interactable } from './Interactable'

export class Pickup implements Interactable {
  constructor(readonly id: string, readonly label: string, readonly amount: number) {}
  interact(): void {}
}
