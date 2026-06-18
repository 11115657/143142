export class PreloadQueue {
  constructor(private readonly onProgress: (label: string, progress: number) => void) {}

  async run(tasks: Array<{ label: string; task: () => Promise<unknown> }>): Promise<void> {
    for (let index = 0; index < tasks.length; index++) {
      const item = tasks[index]
      this.onProgress(item.label, index / Math.max(1, tasks.length))
      await item.task()
    }
    this.onProgress('资源准备完成', 1)
  }
}
