export class SettingsStorage {
  get<T>(key: string, fallback: T): T {
    const raw = localStorage.getItem(`twfps:${key}`)
    return raw ? JSON.parse(raw) as T : fallback
  }
  set<T>(key: string, value: T): void { localStorage.setItem(`twfps:${key}`, JSON.stringify(value)) }
}
