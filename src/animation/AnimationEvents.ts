export class AnimationEvents {
  private handlers = new Map<string, () => void>()
  on(name: string, handler: () => void): void { this.handlers.set(name, handler) }
  trigger(name: string): void { this.handlers.get(name)?.() }
}
