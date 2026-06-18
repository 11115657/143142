import type { SpawnPoint } from '../types/game'

export const PlayerSpawn: SpawnPoint = { id: 'player_spawn', position: [0, 0, 34], yaw: Math.PI }

export const EnemySpawns: SpawnPoint[] = [
  { id: 'enemy_01', position: [-14, 0, 10] },
  { id: 'enemy_02', position: [9, 0, 7] },
  { id: 'enemy_03', position: [19, 0, -7] },
  { id: 'enemy_04', position: [-25, 0, -2] },
  { id: 'enemy_05', position: [27, 0, -19] },
  { id: 'enemy_06', position: [-34, 0, 22] },
  { id: 'enemy_07', position: [32, 0, 14] },
  { id: 'enemy_08', position: [-6, 0, -24] },
  { id: 'enemy_reinforce_01', position: [38, 0, 35] },
  { id: 'enemy_reinforce_02', position: [-38, 0, 34] },
  { id: 'enemy_reinforce_03', position: [36, 0, -35] },
  { id: 'enemy_reinforce_04', position: [-36, 0, -35] }
]
