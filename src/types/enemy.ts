export type EnemyState = 'idle' | 'patrol' | 'alert' | 'chase' | 'take_cover' | 'attack' | 'reload' | 'search' | 'dead'
export type EnemyClass = 'rifleman' | 'breacher' | 'heavy' | 'marksman'

export type EnemyConfig = {
  id: string
  displayName: string
  classType: EnemyClass
  model: string
  health: number
  armor: number
  speed: number
  detectionRange: number
  attackRange: number
  damage: number
  fireInterval: number
  accuracy: number
  burstSize: number
  reactionTime: number
  preferredDistance: number
}
