import * as THREE from 'three'

export class ParticlePool {
  readonly group = new THREE.Group()
  private particles: THREE.Mesh[] = []

  spawn(position: THREE.Vector3, color = 0xffd280): void {
    const mesh = this.particles.pop() ?? new THREE.Mesh(new THREE.SphereGeometry(0.035, 6, 4), new THREE.MeshBasicMaterial({ color }))
    mesh.position.copy(position)
    mesh.visible = true
    this.group.add(mesh)
    setTimeout(() => { mesh.visible = false; this.group.remove(mesh); this.particles.push(mesh) }, 180)
  }
}
