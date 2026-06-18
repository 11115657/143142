export class Debug {
  static enabled = false
  static log(...args: unknown[]): void {
    if (Debug.enabled) console.log('[TacticalWebFPS]', ...args)
  }
  static warn(...args: unknown[]): void {
    console.warn('[TacticalWebFPS]', ...args)
  }
}
