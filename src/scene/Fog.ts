import * as THREE from 'three'

export function applyTacticalFog(scene: THREE.Scene): void {
  scene.fog = new THREE.FogExp2(0x07111f, 0.018)
}
