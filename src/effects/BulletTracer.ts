import * as THREE from 'three'

export class BulletTracer {
  readonly group = new THREE.Group()
  private lines: Array<{ line: THREE.Line; ttl: number }> = []

  spawn(from: THREE.Vector3, to: THREE.Vector3): void {
    const geometry = new THREE.BufferGeometry().setFromPoints([from.clone(), to.clone()])
    const material = new THREE.LineBasicMaterial({ color: 0xfff0a6, transparent: true, opacity: 0.75 })
    const line = new THREE.Line(geometry, material)
    this.group.add(line)
    this.lines.push({ line, ttl: 0.055 })
  }

  update(delta: number): void {
    for (const item of [...this.lines]) {
      item.ttl -= delta
      if (item.ttl <= 0) {
        this.group.remove(item.line)
        item.line.geometry.dispose()
        ;(item.line.material as THREE.Material).dispose()
        this.lines.splice(this.lines.indexOf(item), 1)
      }
    }
  }
}
