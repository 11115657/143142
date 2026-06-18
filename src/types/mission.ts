export type MissionObjectiveType = 'eliminate' | 'interact' | 'extract'

export type MissionObjectiveConfig = {
  id: string
  type: MissionObjectiveType
  targetId?: string
  targetCount?: number
  description: string
}

export type MissionConfig = {
  id: string
  name: string
  level: string
  objectives: MissionObjectiveConfig[]
}
