import * as THREE from 'three'

export class TextureLoaderService {
  private readonly loader = new THREE.TextureLoader()
  private readonly cache = new Map<string, THREE.Texture>()

  async load(url: string): Promise<THREE.Texture | null> {
    if (this.cache.has(url)) return this.cache.get(url)!
    try {
      const texture = await this.loader.loadAsync(url)
      texture.colorSpace = THREE.SRGBColorSpace
      this.cache.set(url, texture)
      return texture
    } catch {
      return null
    }
  }
}
