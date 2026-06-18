import type * as THREE from 'three'
import { AssetManager } from '../assets/AssetManager'
import { AssetManifest } from '../assets/AssetManifest'
import { enableObjectShadows } from '../renderer/Shadows'
import type { PhysicsWorld } from '../physics/PhysicsWorld'
import { Level } from './Level'

export class LevelLoader {
  constructor(private readonly assets: AssetManager, private readonly physics: PhysicsWorld) {}

  async loadTrainingBase(scene: THREE.Scene): Promise<Level> {
    const level = new Level(this.physics)
    const glb = await this.assets.cloneGltfScene(AssetManifest.maps.trainingBase)
    if (glb) {
      enableObjectShadows(glb)
      level.group.add(glb)
      // A Blender collision GLB can be parsed here later. The procedural blockers remain as safe fallback.
      level.buildProcedural()
    } else {
      level.buildProcedural()
    }
    scene.add(level.group)
    return level
  }
}
