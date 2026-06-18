export class AudioLoaderService {
  private readonly cache = new Map<string, HTMLAudioElement>()

  async load(url: string): Promise<HTMLAudioElement | null> {
    if (this.cache.has(url)) return this.cache.get(url)!.cloneNode(true) as HTMLAudioElement
    try {
      const audio = new Audio(url)
      audio.preload = 'auto'
      this.cache.set(url, audio)
      return audio.cloneNode(true) as HTMLAudioElement
    } catch {
      return null
    }
  }
}
