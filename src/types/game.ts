import type { Object3D, Vector3 } from 'three'

export type QualityPreset = 'low' | 'medium' | 'high' | 'ultra'

export type GameEventMap = {
  'loading:progress': { label: string; progress: number }
  'game:ready': undefined
  'game:pause': undefined
  'game:resume': undefined
  'player:damage': { amount: number; health: number; source?: string }
  'player:death': undefined
  'player:supply': { type: 'ammo' | 'armor' | 'medkit' }
  'weapon:fire': { weaponId: string; ammo: number; reserve: number }
  'weapon:reload:start': { weaponId: string }
  'weapon:reload:end': { weaponId: string; ammo: number; reserve: number }
  'weapon:empty': { weaponId: string }
  'combat:hit': { targetId: string; damage: number; isKill: boolean }
  'enemy:death': { id: string }
  'mission:objective': { title: string; objective: string }
  'mission:complete': { title: string }
  'ui:toast': { message: string; tone?: 'info' | 'danger' | 'success' }
}

export type Updateable = {
  update(delta: number): void
}

export type FixedUpdateable = {
  fixedUpdate(delta: number): void
}

export type Disposable = {
  dispose(): void
}

export type SpawnPoint = {
  id: string
  position: [number, number, number]
  yaw?: number
}

export type CollidableBox = {
  id: string
  center: Vector3
  half: Vector3
  object?: Object3D
}
