export class ProgressStorage {
  markMissionComplete(id: string): void { localStorage.setItem(`twfps:mission:${id}`, 'complete') }
}
