# Tactical Web FPS - GitHub Pages Realism Vertical Slice

这是一个可部署到 GitHub Pages 的 Web 3D 战术射击游戏纵切原型。它使用 TypeScript、Vite、Three.js、程序化关卡、程序化占位资产和 Blender GLB 资产插槽，实现了单人 PVE 战术射击的核心闭环。

> 说明：十几 GB 的商业游戏体积主要来自高精度模型、贴图、动画、音频、剧情视频和多地图资源。本仓库不会用无意义文件撑体积，也不会内置任何商业游戏资产。当前版本重点是完整可运行架构和玩法系统；你的 Blender 资产后续放入 `public/assets` 即可逐步替换。

## 当前版本

`v0.3.0-realism-vertical-slice`

## 已实现

- GitHub Pages 兼容部署
- 程序化训练基地地图：围墙、塔楼、指挥楼、仓库、集装箱区、车辆区、靶场、撤离点
- 第一人称移动：WASD、奔跑、蹲伏、跳跃、鼠标锁定
- 生命、护甲、体力、医疗包
- 三把武器：步枪、冲锋枪、手枪
- 射击、换弹、瞄准、后坐力、散布、穿甲、命中反馈
- Hitscan 命中检测：头部、躯干、肢体
- 四类敌人：步枪兵、突入兵、重甲兵、精确射手
- AI：巡逻、搜索、发现、追击、交火、找掩体、反应时间、爆发射击
- 战术手雷：投掷、重力、反弹、延迟爆炸、范围伤害
- 任务链：清理敌人、访问情报终端、撤离
- 补给交互：弹药、护甲、医疗包
- HUD：任务、生命、护甲、体力、弹药、医疗包、手雷、交互提示、调试信息
- Blender GLB 资产路径规范和检查脚本

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

## 预览构建产物

```bash
npm run preview
```

## GitHub Pages 部署

1. 把本项目文件放到仓库根目录。
2. 推送到 `main` 分支。
3. GitHub 仓库进入 `Settings -> Pages`。
4. Source 选择 `GitHub Actions`。
5. 等待 `Deploy Game to GitHub Pages` 工作流完成。

## 操作

| 操作 | 按键 |
|---|---|
| 移动 | W / A / S / D |
| 奔跑 | Shift |
| 蹲伏 | Ctrl |
| 跳跃 | Space |
| 射击 | 鼠标左键 |
| 瞄准 | 鼠标右键 |
| 换弹 | R |
| 交互 | F |
| 医疗包 | X |
| 手雷 | G |
| 切换武器 | 1 / 2 / 3 |
| 调试信息 | Tab |

## Blender 资产插槽

详见：`docs/BLENDER_ASSET_SLOTS.md`

核心路径：

```txt
public/assets/characters/player/player.glb
public/assets/characters/enemies/grunt.glb
public/assets/characters/enemies/breacher.glb
public/assets/characters/enemies/heavy.glb
public/assets/characters/enemies/marksman.glb
public/assets/weapons/rifle_a.glb
public/assets/weapons/smg_a.glb
public/assets/weapons/pistol_a.glb
public/assets/maps/training_base.glb
public/assets/maps/collision_training_base.glb
public/assets/maps/navmesh_training_base.glb
```

## 资产检查

```bash
npm run asset:audit
```

缺失资产不会阻止游戏运行，程序化占位模型会作为 fallback。

## 重要边界

- GitHub Pages 是静态站点托管，不是实时游戏服务器。
- 多人联机、账号、匹配、排行榜、存档、反作弊需要外部服务。
- 浏览器游戏不适合直接塞十几 GB 资源；大型资源建议放 CDN 或做客户端版本。

## 后续路线

详见：`docs/NEXT_STEPS.md`
