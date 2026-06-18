import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

export class GLTFLoaderService {
  private readonly loader = new GLTFLoader()
  private readonly cache = new Map<string, GLTF>()

  async load(url: string): Promise<GLTF | null> {
    if (this.cache.has(url)) return this.cache.get(url)!
    try {
      const gltf = await this.loader.loadAsync(url)
      this.cache.set(url, gltf)
      return gltf
    } catch {
      return null
    }
  }
}
