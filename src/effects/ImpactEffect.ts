import * as THREE from 'three'
import { ParticlePool } from './ParticlePool'

export class ImpactEffect {
  constructor(private readonly pool: ParticlePool) {}
  spawn(point: THREE.Vector3, enemy = false): void {
    for (let i = 0; i < (enemy ? 8 : 4); i++) this.pool.spawn(point.clone().add(new THREE.Vector3((Math.random()-.5)*.25, Math.random()*.2, (Math.random()-.5)*.25)), enemy ? 0xff425b : 0xffd280)
  }
}
