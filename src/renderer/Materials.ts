import * as THREE from 'three'

export const Materials = {
  concrete: new THREE.MeshStandardMaterial({ color: 0x6f7884, roughness: 0.92, metalness: 0.02 }),
  darkConcrete: new THREE.MeshStandardMaterial({ color: 0x303944, roughness: 0.95 }),
  metal: new THREE.MeshStandardMaterial({ color: 0x3a4650, roughness: 0.42, metalness: 0.65 }),
  accent: new THREE.MeshStandardMaterial({ color: 0x1ba3d7, roughness: 0.5, metalness: 0.2, emissive: 0x031522 }),
  enemy: new THREE.MeshStandardMaterial({ color: 0x89444c, roughness: 0.68, metalness: 0.08 }),
  enemyHeavy: new THREE.MeshStandardMaterial({ color: 0x6c3038, roughness: 0.6, metalness: 0.28 }),
  enemyMarksman: new THREE.MeshStandardMaterial({ color: 0x3f5d43, roughness: 0.72, metalness: 0.08 }),
  playerWeapon: new THREE.MeshStandardMaterial({ color: 0x1e252c, roughness: 0.45, metalness: 0.55 }),
  glass: new THREE.MeshStandardMaterial({ color: 0x96d8ff, transparent: true, opacity: 0.32, roughness: 0.1, metalness: 0.05, emissive: 0x06283a }),
  ground: new THREE.MeshStandardMaterial({ color: 0x293225, roughness: 0.98, metalness: 0.01 }),
  road: new THREE.MeshStandardMaterial({ color: 0x141a20, roughness: 0.86, metalness: 0.04 }),
  linePaint: new THREE.MeshStandardMaterial({ color: 0xd8e1e7, roughness: 0.72 }),
  wood: new THREE.MeshStandardMaterial({ color: 0x7b5637, roughness: 0.82 }),
  sand: new THREE.MeshStandardMaterial({ color: 0x9b8559, roughness: 0.95 }),
  rock: new THREE.MeshStandardMaterial({ color: 0x4d524e, roughness: 0.96 }),
  target: new THREE.MeshStandardMaterial({ color: 0xe8e2d6, roughness: 0.75, metalness: 0.04 }),
  containerBlue: new THREE.MeshStandardMaterial({ color: 0x1f5679, roughness: 0.68, metalness: 0.25 }),
  containerRed: new THREE.MeshStandardMaterial({ color: 0x813d35, roughness: 0.72, metalness: 0.22 }),
  containerTan: new THREE.MeshStandardMaterial({ color: 0xa78a52, roughness: 0.78, metalness: 0.12 }),
  ammo: new THREE.MeshStandardMaterial({ color: 0x3d7a3f, roughness: 0.6, metalness: 0.25, emissive: 0x09290b }),
  armor: new THREE.MeshStandardMaterial({ color: 0x2d5f8a, roughness: 0.55, metalness: 0.35, emissive: 0x071827 }),
  medkit: new THREE.MeshStandardMaterial({ color: 0xb6323e, roughness: 0.52, metalness: 0.08, emissive: 0x26060a }),
  grenade: new THREE.MeshStandardMaterial({ color: 0x596250, roughness: 0.68, metalness: 0.35 })
}
