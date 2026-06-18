import type { Interactable } from './Interactable'

export class Door implements Interactable {
  id = 'door'
  label = '开门'
  open = false
  interact(): void { this.open = !this.open }
}
