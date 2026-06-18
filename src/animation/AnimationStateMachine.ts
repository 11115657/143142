export class AnimationStateMachine<T extends string> {
  state: T
  constructor(initial: T) { this.state = initial }
  set(state: T): void { this.state = state }
}
