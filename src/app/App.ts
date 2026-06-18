import { EventBus } from '../core/EventBus'
import { Game } from '../core/Game'
import { GameCanvas } from './GameCanvas'
import { LoadingScreen } from './LoadingScreen'
import { ErrorScreen } from './ErrorScreen'

export class App {
  private readonly events = new EventBus()
  private readonly loading = new LoadingScreen()
  private readonly error = new ErrorScreen()
  private game?: Game

  async start(): Promise<void> {
    try {
      const canvas = new GameCanvas().canvas
      this.events.on('loading:progress', (payload) => this.loading.set(payload.label, payload.progress))
      this.events.on('game:ready', () => this.loading.hide())
      this.game = new Game(canvas, this.events)
      await this.game.init()
      this.game.start()
    } catch (error) {
      this.error.show(error)
      throw error
    }
  }
}
