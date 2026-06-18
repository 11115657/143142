import * as THREE from 'three'

export function explosionDamage(center: THREE.Vector3, target: THREE.Vector3, radius: number, maxDamage: number): number {
  const distance = center.distanceTo(target)
  if (distance > radius) return 0
  return Math.round(maxDamage * (1 - distance / radius))
}
