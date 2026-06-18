# Next Development Steps

## v0.4 建议

1. 接入真实 GLB 模型加载替换程序化武器和敌人。
2. 增加第一人称手臂动画：Idle、Aim、Fire、Reload、Sprint。
3. 把地图拆成多个区块，支持按距离加载。
4. 加入 KTX2/Basis 贴图压缩。
5. 增加音效资源：枪声、换弹、脚步、命中、爆炸、环境声。
6. 增加设置菜单：画质、鼠标灵敏度、音量、按键。
7. 增加小地图或雷达。
8. 增加更多任务目标：爆破、守点、数据上传、救援。
9. 增加 AI 小队协作：包抄、压制、撤退、呼叫增援。
10. 准备多人联机服务器，但不要部署在 GitHub Pages。

## v1.0 需要外部服务

GitHub Pages 不能承担实时游戏服务器。多人联机、账号、匹配、排行榜、存档和反作弊需要服务器，例如：

- Colyseus / Socket.IO / Nakama
- Cloudflare Workers Durable Objects
- Fly.io / Render / Railway / VPS
- 专用游戏服务器
