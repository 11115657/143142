import type { EventBus } from '../core/EventBus'
import { Crosshair } from './Crosshair'
import { AmmoPanel } from './AmmoPanel'
import { HealthPanel } from './HealthPanel'
import { DamageIndicator } from './DamageIndicator'
import { InteractionPrompt } from './InteractionPrompt'
import { MissionPanel } from './MissionPanel'
import { Toast } from './Toast'
import { PauseMenu } from './PauseMenu'
import { StatusPanel } from './StatusPanel'

export class HUD {
  readonly root = document.querySelector<HTMLElement>('#hud')
  readonly debug = document.querySelector<HTMLElement>('#debug')
  readonly crosshair = new Crosshair()
  readonly ammo = new AmmoPanel()
  readonly health = new HealthPanel()
  readonly status = new StatusPanel()
  readonly damage = new DamageIndicator()
  readonly interaction = new InteractionPrompt()
  readonly mission = new MissionPanel()
  readonly toast = new Toast()
  readonly pause = new PauseMenu()

  constructor(events: EventBus) {
    events.on('game:ready', () => this.root?.classList.remove('hidden'))
    events.on('player:damage', () => this.damage.flash())
    events.on('combat:hit', (payload) => {
      this.crosshair.showHit()
      if (payload.isKill) this.toast.show('目标已清除')
    })
    events.on('ui:toast', (payload) => this.toast.show(payload.message))
    events.on('mission:objective', (payload) => this.mission.set(payload.title, payload.objective))
    events.on('mission:complete', (payload) => this.toast.show(`${payload.title} 完成`))
    events.on('game:pause', () => this.pause.setVisible(true))
    events.on('game:resume', () => this.pause.setVisible(false))
  }

  setDebug(visible: boolean, text: string): void {
    if (!this.debug) return
    this.debug.classList.toggle('hidden', !visible)
    this.debug.textContent = text
  }
}
