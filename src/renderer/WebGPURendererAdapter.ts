export class WebGPURendererAdapter {
  // Three.js WebGPU renderer APIs are still evolving. This class is kept as an
  // extension slot so the project can enable WebGPU without changing game logic.
  static isAvailable(): boolean {
    return 'gpu' in navigator
  }
}
