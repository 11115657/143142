import * as THREE from 'three'

export class AnimationController {
  mixer?: THREE.AnimationMixer
  actions = new Map<string, THREE.AnimationAction>()

  attach(root: THREE.Object3D, clips: THREE.AnimationClip[]): void {
    this.mixer = new THREE.AnimationMixer(root)
    for (const clip of clips) this.actions.set(clip.name, this.mixer.clipAction(clip))
  }

  play(name: string, fade = 0.15): void {
    const action = this.actions.get(name)
    if (!action) return
    action.reset().fadeIn(fade).play()
  }

  update(delta: number): void { this.mixer?.update(delta) }
}
