import * as THREE from 'three'

export class PatrolRoute {
  index = 0
  constructor(readonly points: THREE.Vector3[]) {}
  current(): THREE.Vector3 { return this.points[this.index] }
  advanceIfClose(position: THREE.Vector3): void {
    if (position.distanceTo(this.current()) < 1.1) this.index = (this.index + 1) % this.points.length
  }
}
