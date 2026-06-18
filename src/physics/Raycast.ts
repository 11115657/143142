import * as THREE from 'three'

export function rayFromCamera(camera: THREE.Camera): { origin: THREE.Vector3; direction: THREE.Vector3 } {
  const origin = new THREE.Vector3()
  const direction = new THREE.Vector3()
  camera.getWorldPosition(origin)
  camera.getWorldDirection(direction)
  return { origin, direction: direction.normalize() }
}
