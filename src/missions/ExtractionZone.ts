import * as THREE from 'three'

export class ExtractionZone {
  constructor(readonly center: THREE.Vector3, readonly radius: number) {}
  contains(position: THREE.Vector3): boolean { return centerDistance2D(this.center, position) <= this.radius }
}

function centerDistance2D(a: THREE.Vector3, b: THREE.Vector3): number {
  const dx = a.x - b.x
  const dz = a.z - b.z
  return Math.sqrt(dx * dx + dz * dz)
}
