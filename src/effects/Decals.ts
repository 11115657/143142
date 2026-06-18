import * as THREE from 'three'

export class Decals {
  readonly group = new THREE.Group()
  private decals: THREE.Mesh[] = []

  addBulletHole(point: THREE.Vector3, normal: THREE.Vector3): void {
    const decal = new THREE.Mesh(
      new THREE.CircleGeometry(0.07, 10),
      new THREE.MeshBasicMaterial({ color: 0x050505, transparent: true, opacity: 0.65, depthWrite: false })
    )
    decal.position.copy(point).addScaledVector(normal, 0.01)
    decal.lookAt(point.clone().add(normal))
    this.group.add(decal)
    this.decals.push(decal)
    if (this.decals.length > 80) {
      const old = this.decals.shift()!
      this.group.remove(old)
      old.geometry.dispose()
      ;(old.material as THREE.Material).dispose()
    }
  }
}
