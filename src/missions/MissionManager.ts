import * as THREE from 'three'
import { EventBus } from '../core/EventBus'
import { MissionData } from './MissionData'
import { ObjectiveRuntime } from './Objectives'
import type { Player } from '../player/Player'

export class MissionManager {
  readonly mission = MissionData[0]
  readonly objectives = this.mission.objectives.map((config) => new ObjectiveRuntime(config))
  currentIndex = 0
  kills = 0
  completed = false

  constructor(private readonly events: EventBus) {
    this.announce()
    events.on('enemy:death', () => this.onKill())
  }

  update(player: Player): void {
    if (this.completed) return
    const current = this.current
    if (!current) return
    if (current.config.type === 'interact' && player.interaction.completedTerminal) this.completeCurrent()
    if (current.config.type === 'extract') {
      const extraction = new THREE.Vector3(0, 0, 36)
      const distance = extraction.distanceTo(player.controller.position)
      if (distance < 2.5) this.completeCurrent()
    }
  }

  get current(): ObjectiveRuntime | undefined { return this.objectives[this.currentIndex] }

  private onKill(): void {
    this.kills++
    const current = this.current
    if (current?.config.type === 'eliminate') {
      current.advance(1)
      if (current.completed) this.completeCurrent()
      else this.announce()
    }
  }

  private completeCurrent(): void {
    const current = this.current
    if (!current) return
    current.completed = true
    this.currentIndex++
    if (this.currentIndex >= this.objectives.length) {
      this.completed = true
      this.events.emit('mission:complete', { title: this.mission.name })
      this.events.emit('ui:toast', { message: '任务完成：已成功撤离', tone: 'success' })
    } else {
      this.announce()
    }
  }

  private announce(): void {
    const current = this.current
    if (!current) return
    const suffix = current.config.targetCount ? ` ${current.progress}/${current.config.targetCount}` : ''
    this.events.emit('mission:objective', { title: this.mission.name, objective: `${current.config.description}${suffix}` })
  }
}
