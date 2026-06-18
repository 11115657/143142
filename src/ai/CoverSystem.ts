import * as THREE from 'three'

export class CoverSystem {
  findFallback(position: THREE.Vector3): THREE.Vector3 {
    return position.clone().add(new THREE.Vector3((Math.random() - 0.5) * 6, 0, (Math.random() - 0.5) * 6))
  }
}
