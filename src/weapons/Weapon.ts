import * as THREE from 'three'
import type { WeaponConfig, RuntimeWeaponState } from '../types/weapon'
import { AmmoSystem } from './AmmoSystem'
import { WeaponAnimation } from './WeaponAnimation'
import { WeaponSway } from './WeaponSway'
import { Materials } from '../renderer/Materials'

export class Weapon {
  readonly state: RuntimeWeaponState
  readonly model = new THREE.Group()
  readonly animation = new WeaponAnimation()
  readonly sway = new WeaponSway()
  private reloadTimer = 0

  constructor(readonly config: WeaponConfig) {
    this.state = AmmoSystem.createState(config)
    this.buildFallbackModel()
  }

  update(delta: number, time: number, moving: boolean, aiming: boolean): void {
    this.state.isAiming = aiming
    if (this.state.isReloading) {
      this.reloadTimer -= delta
      if (this.reloadTimer <= 0) {
        AmmoSystem.reload(this.config, this.state)
        this.state.isReloading = false
      }
    }
    this.animation.update(this.model, delta)
    this.sway.update(this.model, time, moving, aiming)
    const aimX = aiming ? 0.03 : 0.34
    const aimY = aiming ? -0.18 : this.model.position.y
    this.model.position.x += (aimX - this.model.position.x) * Math.min(1, delta * 10)
    this.model.position.y += (aimY - this.model.position.y) * Math.min(1, delta * 10)
  }

  startReload(): boolean {
    if (this.state.isReloading || this.state.ammo >= this.config.magazineSize || this.state.reserve <= 0) return false
    this.state.isReloading = true
    this.reloadTimer = this.config.reloadTime
    return true
  }

  private buildFallbackModel(): void {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.14, 0.68), Materials.playerWeapon)
    const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.07, 0.62), Materials.metal)
    const grip = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.28, 0.12), Materials.playerWeapon)
    barrel.position.z = -0.58
    grip.position.set(0, -0.18, -0.1)
    this.model.add(body, barrel, grip)
    this.model.position.set(0.34, -0.28, -0.55)
  }
}
