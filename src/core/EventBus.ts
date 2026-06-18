import type { GameEventMap } from '../types/game'

type Handler<T> = (payload: T) => void

export class EventBus {
  private handlers = new Map<keyof GameEventMap, Set<Handler<any>>>()

  on<K extends keyof GameEventMap>(event: K, handler: Handler<GameEventMap[K]>): () => void {
    const set = this.handlers.get(event) ?? new Set<Handler<any>>()
    set.add(handler)
    this.handlers.set(event, set)
    return () => this.off(event, handler)
  }

  off<K extends keyof GameEventMap>(event: K, handler: Handler<GameEventMap[K]>): void {
    this.handlers.get(event)?.delete(handler)
  }

  emit<K extends keyof GameEventMap>(event: K, payload: GameEventMap[K]): void {
    const set = this.handlers.get(event)
    if (!set) return
    for (const handler of set) handler(payload)
  }

  clear(): void {
    this.handlers.clear()
  }
}
