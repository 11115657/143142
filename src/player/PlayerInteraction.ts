import * as THREE from 'three'
import type { Level } from '../scene/Level'
import type { InputState } from '../input/InputManager'
import { EventBus } from '../core/EventBus'

export class PlayerInteraction {
  current: string | null = null
  currentLabel = ''
  completedTerminal = false

  constructor(private readonly camera: THREE.Camera, private readonly events: EventBus) {}

  update(input: InputState, level: Level): void {
    this.current = null
    this.currentLabel = ''
    const origin = new THREE.Vector3()
    const direction = new THREE.Vector3()
    this.camera.getWorldPosition(origin)
    this.camera.getWorldDirection(direction)
    let bestDistance = Infinity
    for (const [id, object] of level.interactables) {
      const pos = new THREE.Vector3()
      object.getWorldPosition(pos)
      const to = pos.sub(origin)
      const distance = to.length()
      const alignment = to.normalize().dot(direction)
      if (distance < 3.35 && alignment > 0.76 && distance < bestDistance) {
        this.current = id
        const supply = level.supplyTypes.get(id)
        this.currentLabel = supply === 'ammo' ? '按 F 补充弹药' : supply === 'armor' ? '按 F 补充护甲' : supply === 'medkit' ? '按 F 拾取医疗包' : '按 F 访问情报终端'
        bestDistance = distance
      }
    }
    if (this.current && input.interact) {
      const supply = level.supplyTypes.get(this.current)
      if (supply) {
        const object = level.interactables.get(this.current)
        object?.parent?.remove(object)
        level.interactables.delete(this.current)
        level.supplyTypes.delete(this.current)
        this.events.emit('player:supply', { type: supply })
        return
      }
      if (this.current === 'intel_terminal' && !this.completedTerminal) {
        this.completedTerminal = true
        this.events.emit('ui:toast', { message: '情报终端访问完成：敌方增援频道已截获', tone: 'success' })
      }
    }
  }
}
