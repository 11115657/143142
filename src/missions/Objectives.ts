import type { MissionObjectiveConfig } from '../types/mission'

export class ObjectiveRuntime {
  progress = 0
  completed = false
  constructor(readonly config: MissionObjectiveConfig) {}
  advance(amount = 1): void {
    this.progress += amount
    if (this.config.targetCount) this.completed = this.progress >= this.config.targetCount
    else this.completed = true
  }
}
