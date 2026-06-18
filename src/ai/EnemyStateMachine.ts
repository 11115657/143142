import type { EnemyState } from '../types/enemy'

export class EnemyStateMachine {
  state: EnemyState = 'patrol'
  set(state: EnemyState): void { this.state = state }
}
