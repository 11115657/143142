import * as THREE from 'three'

export class PhysicsBodyFactory {
  static fromMeshBox(mesh: THREE.Mesh): { center: THREE.Vector3; half: THREE.Vector3 } {
    const box = new THREE.Box3().setFromObject(mesh)
    const size = box.getSize(new THREE.Vector3()).multiplyScalar(0.5)
    const center = box.getCenter(new THREE.Vector3())
    return { center, half: size }
  }
}
