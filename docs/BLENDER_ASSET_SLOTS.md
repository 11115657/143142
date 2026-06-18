# Blender Asset Slots

把 Blender 导出的 `.glb` 放到以下路径即可逐步替换程序化占位资产。

## 角色

```txt
public/assets/characters/player/player.glb
public/assets/characters/enemies/grunt.glb
public/assets/characters/enemies/breacher.glb
public/assets/characters/enemies/heavy.glb
public/assets/characters/enemies/marksman.glb
```

## 武器

```txt
public/assets/weapons/rifle_a.glb
public/assets/weapons/smg_a.glb
public/assets/weapons/pistol_a.glb
```

## 地图

```txt
public/assets/maps/training_base.glb
public/assets/maps/collision_training_base.glb
public/assets/maps/navmesh_training_base.glb
```

## 导出要求

- 单位：米。
- 角色高度：1.75-1.85。
- 原点：角色脚底中心，武器握把或瞄具参考点，地图世界中心。
- 导出前 Apply Transform。
- 贴图优先 1K/2K，Web 端慎用 4K。
- 动画命名统一：Idle、Walk、Run、Sprint、Crouch、Aim、Fire、Reload、Hit、Death。
- 地图视觉模型、碰撞模型、导航网格分开导出。

## 预算建议

| 资产 | Web Demo 推荐上限 |
|---|---:|
| 玩家角色/手臂 | 18MB |
| 普通敌人 | 14MB |
| 重甲敌人 | 20MB |
| 单把武器 | 5-8MB |
| 训练基地地图视觉模型 | 120MB |
| 碰撞模型 | 4MB |
| 导航网格 | 4MB |
