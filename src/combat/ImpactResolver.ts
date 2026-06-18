import * as THREE from 'three'

export type ImpactKind = 'metal' | 'concrete' | 'enemy'

export class ImpactResolver {
  static normalFromDirection(direction: THREE.Vector3): THREE.Vector3 {
    return direction.clone().negate().normalize()
  }
}
