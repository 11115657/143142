import * as THREE from 'three'
import { ParticlePool } from './ParticlePool'
import { MuzzleFlash } from './MuzzleFlash'
import { BulletTracer } from './BulletTracer'
import { ImpactEffect } from './ImpactEffect'
import { Decals } from './Decals'
import { ScreenShake } from './ScreenShake'

export class EffectsManager {
  readonly group = new THREE.Group()
  readonly particles = new ParticlePool()
  readonly muzzle = new MuzzleFlash()
  readonly tracer = new BulletTracer()
  readonly impact = new ImpactEffect(this.particles)
  readonly decals = new Decals()
  readonly screenShake = new ScreenShake()
  currentShake = 0

  constructor(scene: THREE.Scene) {
    this.group.add(this.particles.group, this.muzzle.light, this.tracer.group, this.decals.group)
    scene.add(this.group)
  }

  update(delta: number): void {
    this.muzzle.update(delta)
    this.tracer.update(delta)
    this.currentShake = this.screenShake.update(delta)
  }
}
