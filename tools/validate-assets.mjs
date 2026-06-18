import { access, stat } from 'node:fs/promises'
import { join } from 'node:path'

const required = [
  { file: 'characters/player/player.glb', maxMb: 18, note: '第一人称手臂或第三人称角色' },
  { file: 'characters/enemies/grunt.glb', maxMb: 14, note: '普通敌人' },
  { file: 'characters/enemies/breacher.glb', maxMb: 14, note: '近战突入敌人' },
  { file: 'characters/enemies/heavy.glb', maxMb: 20, note: '重甲敌人' },
  { file: 'characters/enemies/marksman.glb', maxMb: 14, note: '远程敌人' },
  { file: 'weapons/rifle_a.glb', maxMb: 8, note: '主步枪' },
  { file: 'weapons/smg_a.glb', maxMb: 7, note: '冲锋枪' },
  { file: 'weapons/pistol_a.glb', maxMb: 5, note: '副武器' },
  { file: 'maps/training_base.glb', maxMb: 120, note: '视觉地图' },
  { file: 'maps/collision_training_base.glb', maxMb: 4, note: '简化碰撞' },
  { file: 'maps/navmesh_training_base.glb', maxMb: 4, note: 'AI 导航网格' }
]

const root = new URL('../public/assets/', import.meta.url).pathname
let missing = 0
let oversize = 0
for (const item of required) {
  const path = join(root, item.file)
  try {
    await access(path)
    const s = await stat(path)
    const mb = s.size / 1024 / 1024
    const ok = mb <= item.maxMb
    if (!ok) oversize++
    console.log(`${ok ? 'OK' : 'OVERSIZE'} ${item.file} ${mb.toFixed(2)}MB / budget ${item.maxMb}MB - ${item.note}`)
  } catch {
    missing++
    console.warn(`MISSING ${item.file} - ${item.note}; runtime will use procedural fallback where supported`)
  }
}
if (missing) console.warn(`${missing} expected Blender assets are not present yet.`)
if (oversize) console.warn(`${oversize} assets exceed recommended GitHub Pages/Web runtime budgets.`)
