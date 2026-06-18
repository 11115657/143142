import * as THREE from 'three'
import { Materials } from '../renderer/Materials'

export class Environment {
  readonly group = new THREE.Group()

  constructor() {
    const ground = new THREE.Mesh(new THREE.BoxGeometry(90, 0.2, 90), Materials.darkConcrete)
    ground.position.y = -0.11
    ground.receiveShadow = true
    this.group.add(ground)

    const grid = new THREE.GridHelper(90, 45, 0x32506c, 0x20354c)
    grid.position.y = 0.005
    this.group.add(grid)
  }
}
