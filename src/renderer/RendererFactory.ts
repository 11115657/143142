import * as THREE from 'three'
import { GameConfig } from '../core/Config'

export type RendererInfo = {
  renderer: THREE.WebGLRenderer
  backend: 'webgl2' | 'webgl'
  webgpuAvailable: boolean
}

export class RendererFactory {
  static create(canvas: HTMLCanvasElement): RendererInfo {
    const context = canvas.getContext('webgl2')
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
      context: context ?? undefined
    })
    renderer.setPixelRatio(RendererFactory.pixelRatio())
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = GameConfig.enableShadows
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    return {
      renderer,
      backend: context ? 'webgl2' : 'webgl',
      webgpuAvailable: 'gpu' in navigator
    }
  }

  static pixelRatio(): number {
    const ratio = window.devicePixelRatio || 1
    switch (GameConfig.quality) {
      case 'low': return Math.min(1, ratio)
      case 'medium': return Math.min(1.25, ratio)
      case 'high': return Math.min(1.5, ratio)
      case 'ultra': return Math.min(2, ratio)
    }
  }
}
