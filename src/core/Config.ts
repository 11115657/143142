import type { QualityPreset } from '../types/game'

export const GameConfig = {
  version: '0.3.0-realism-vertical-slice',
  quality: 'high' as QualityPreset,
  showDebug: false,
  mouseSensitivity: 0.0022,
  aimSensitivityMultiplier: 0.55,
  enablePostFX: true,
  enableShadows: true,
  targetFps: 60,
  world: {
    size: 96,
    fogNear: 34,
    fogFar: 125
  },
  player: {
    maxHealth: 100,
    maxArmor: 55,
    maxStamina: 100,
    walkSpeed: 4.25,
    sprintSpeed: 6.95,
    crouchSpeed: 2.1,
    jumpVelocity: 6.2,
    acceleration: 24,
    friction: 14,
    staminaDrainSprint: 23,
    staminaDrainJump: 12,
    staminaRegen: 18,
    staminaRegenDelay: 0.65,
    medkits: 2,
    grenades: 3
  }
}
