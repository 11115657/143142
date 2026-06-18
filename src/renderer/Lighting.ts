import * as THREE from 'three'

export class Lighting {
  readonly group = new THREE.Group()
  private readonly sun: THREE.DirectionalLight

  constructor(scene: THREE.Scene) {
    scene.background = new THREE.Color(0x07111f)
    scene.fog = new THREE.Fog(0x07111f, 36, 112)

    const hemi = new THREE.HemisphereLight(0xa8d8ff, 0x17200c, 1.7)
    this.group.add(hemi)

    this.sun = new THREE.DirectionalLight(0xfff4d0, 3.2)
    this.sun.position.set(-18, 26, 12)
    this.sun.castShadow = true
    this.sun.shadow.mapSize.set(2048, 2048)
    this.sun.shadow.camera.left = -60
    this.sun.shadow.camera.right = 60
    this.sun.shadow.camera.top = 60
    this.sun.shadow.camera.bottom = -60
    this.sun.shadow.camera.near = 1
    this.sun.shadow.camera.far = 120
    this.group.add(this.sun)

    const fill = new THREE.DirectionalLight(0x3ba7ff, 0.65)
    fill.position.set(20, 8, -20)
    this.group.add(fill)

    scene.add(this.group)
  }
}
