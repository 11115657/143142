import * as THREE from 'three'
import { Enemy } from './Enemy'
import type { Player } from '../player/Player'
import { EnemySpawns } from '../scene/SpawnPoints'
import enemyConfigs from '../data/enemies.json'
import type { EnemyConfig } from '../types/enemy'
import type { Level } from '../scene/Level'
import type { PhysicsWorld } from '../physics/PhysicsWorld'

export class AIManager {
  readonly enemies: Enemy[] = []
  readonly group = new THREE.Group()
  private readonly configs = enemyConfigs as EnemyConfig[]

  spawnInitial(count = 8): void {
    EnemySpawns.slice(0, count).forEach((spawn, index) => {
      const enemy = this.createEnemy(index, new THREE.Vector3(...spawn.position))
      this.enemies.push(enemy)
      this.group.add(enemy.group)
    })
  }

  spawnReinforcements(startIndex = 8, count = 4): void {
    EnemySpawns.slice(startIndex, startIndex + count).forEach((spawn, i) => {
      const enemy = this.createEnemy(startIndex + i, new THREE.Vector3(...spawn.position))
      this.enemies.push(enemy)
      this.group.add(enemy.group)
    })
  }

  update(delta: number, player: Player, level: Level, physics: PhysicsWorld): void {
    for (const enemy of this.enemies) enemy.update(delta, player, level, physics)
  }

  aliveCount(): number {
    return this.enemies.filter((e) => !e.isDead).length
  }

  alertAll(position: THREE.Vector3, radius: number): void {
    for (const enemy of this.enemies) {
      if (!enemy.isDead && enemy.perception.hearNoise(enemy.group.position, position, radius)) enemy.perception.raiseAlert(1)
    }
  }

  private createEnemy(index: number, position: THREE.Vector3): Enemy {
    const config = this.configs[index % this.configs.length]
    return new Enemy(`enemy_${index + 1}_${config.id}`, config, position)
  }
}
