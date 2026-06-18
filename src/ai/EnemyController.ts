import type { Enemy } from './Enemy'
import type { Player } from '../player/Player'
import type { Level } from '../scene/Level'
import type { PhysicsWorld } from '../physics/PhysicsWorld'

export class EnemyController {
  updateEnemy(enemy: Enemy, delta: number, player: Player, level: Level, physics: PhysicsWorld): void {
    enemy.update(delta, player, level, physics)
  }
}
