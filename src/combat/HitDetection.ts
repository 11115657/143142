import * as THREE from 'three'

export type SphereTarget = { id: string; center: THREE.Vector3; radius: number }

export function raySphere(origin: THREE.Vector3, direction: THREE.Vector3, target: SphereTarget, maxDistance: number): number | null {
  const oc = origin.clone().sub(target.center)
  const b = oc.dot(direction)
  const c = oc.lengthSq() - target.radius * target.radius
  const h = b * b - c
  if (h < 0) return null
  const t = -b - Math.sqrt(h)
  return t > 0 && t <= maxDistance ? t : null
}
