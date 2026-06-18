export class ErrorScreen {
  show(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error)
    const node = document.createElement('div')
    node.className = 'screen'
    node.innerHTML = `<div class="panel"><div class="eyebrow">启动失败</div><h2>无法启动游戏</h2><p>${message}</p></div>`
    document.body.appendChild(node)
  }
}
