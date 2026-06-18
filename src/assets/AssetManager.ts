import type * as THREE from 'three'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFLoaderService } from './GLTFLoaderService'
import { TextureLoaderService } from './TextureLoaderService'
import { AudioLoaderService } from './AudioLoaderService'

export class AssetManager {
  readonly gltf = new GLTFLoaderService()
  readonly textures = new TextureLoaderService()
  readonly audio = new AudioLoaderService()

  async cloneGltfScene(url: string): Promise<THREE.Object3D | null> {
    const gltf: GLTF | null = await this.gltf.load(url)
    if (!gltf) return null
    return gltf.scene.clone(true)
  }
}
