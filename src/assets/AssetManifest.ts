import type { AssetRecord } from '../types/asset'

export const AssetManifest = {
  characters: {
    player: './assets/characters/player/player.glb',
    enemyGrunt: './assets/characters/enemies/grunt.glb'
  },
  weapons: {
    rifleA: './assets/weapons/rifle_a.glb',
    pistolA: './assets/weapons/pistol_a.glb'
  },
  maps: {
    trainingBase: './assets/maps/training_base.glb',
    collisionTrainingBase: './assets/maps/collision_training_base.glb'
  },
  audio: {
    rifleFire: './assets/audio/weapons/rifle_fire.ogg',
    pistolFire: './assets/audio/weapons/pistol_fire.ogg',
    reload: './assets/audio/weapons/reload.ogg'
  }
} as const

export const CoreAssetRecords: AssetRecord[] = [
  { id: 'player', type: 'gltf', url: AssetManifest.characters.player },
  { id: 'enemyGrunt', type: 'gltf', url: AssetManifest.characters.enemyGrunt },
  { id: 'rifleA', type: 'gltf', url: AssetManifest.weapons.rifleA },
  { id: 'trainingBase', type: 'gltf', url: AssetManifest.maps.trainingBase }
]
