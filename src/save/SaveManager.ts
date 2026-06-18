import { SettingsStorage } from './SettingsStorage'
import { ProgressStorage } from './ProgressStorage'
export class SaveManager {
  readonly settings = new SettingsStorage()
  readonly progress = new ProgressStorage()
}
