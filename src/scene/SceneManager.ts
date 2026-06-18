import * as THREE from 'three'
import { Environment } from './Environment'
import { Sky } from './Sky'
import { applyTacticalFog } from './Fog'

export class SceneManager {
  readonly scene = new THREE.Scene()

  constructor() {
    this.scene.add(new Environment().group)
    this.scene.add(new Sky().mesh)
    applyTacticalFog(this.scene)
  }
}
