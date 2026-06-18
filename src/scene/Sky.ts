import * as THREE from 'three'

export class Sky {
  readonly mesh: THREE.Mesh
  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(240, 32, 16),
      new THREE.MeshBasicMaterial({ color: 0x09192e, side: THREE.BackSide })
    )
  }
}
