import * as THREE from 'three'
import { Materials } from '../renderer/Materials'
import type { PhysicsWorld } from '../physics/PhysicsWorld'

export type SupplyType = 'ammo' | 'armor' | 'medkit'

export class Level {
  readonly group = new THREE.Group()
  readonly interactables = new Map<string, THREE.Object3D>()
  readonly supplyTypes = new Map<string, SupplyType>()
  readonly coverPoints: THREE.Vector3[] = []
  readonly tacticalLightGroup = new THREE.Group()
  extractionZone!: THREE.Mesh
  terminal!: THREE.Mesh
  extractionPosition = new THREE.Vector3(0, 0, 28)

  constructor(private readonly physics: PhysicsWorld) {}

  buildProcedural(): void {
    this.group.name = 'training_base_procedural_vertical_slice'
    this.group.add(this.tacticalLightGroup)
    this.addGround()
    this.addPerimeter()
    this.addCommandBuilding()
    this.addWarehouse()
    this.addContainerYard()
    this.addVehicleDepot()
    this.addTrainingRange()
    this.addDecorAndLights()
    this.addMissionObjects()
    this.addSupplyCrate('ammo_box_01', -13, 0.45, 16, 'ammo')
    this.addSupplyCrate('armor_box_01', 19, 0.45, -9, 'armor')
    this.addSupplyCrate('med_box_01', -21, 0.45, -13, 'medkit')
  }

  nearestCover(from: THREE.Vector3, threat: THREE.Vector3): THREE.Vector3 | null {
    let best: THREE.Vector3 | null = null
    let bestScore = -Infinity
    for (const cover of this.coverPoints) {
      const away = cover.clone().sub(threat).normalize()
      const toCover = cover.clone().sub(from)
      const score = away.dot(toCover.clone().normalize()) * 3 - toCover.length() * 0.05
      if (score > bestScore) {
        bestScore = score
        best = cover
      }
    }
    return best?.clone() ?? null
  }

  private addGround(): void {
    const ground = new THREE.Mesh(new THREE.BoxGeometry(96, 0.08, 96), Materials.ground)
    ground.position.y = -0.04
    ground.receiveShadow = true
    this.group.add(ground)
    this.physics.addBox('ground', ground.position, new THREE.Vector3(48, 0.04, 48), ground)

    const roadMat = Materials.road
    this.addBox('main_road', 0, 0.011, 3, 8, 0.02, 82, roadMat, false)
    this.addBox('side_road', 0, 0.012, -15, 72, 0.02, 6, roadMat, false)
    for (let i = -36; i <= 36; i += 8) this.addBox(`lane_mark_${i}`, 0, 0.025, i, 0.16, 0.02, 2.8, Materials.linePaint, false)
  }

  private addPerimeter(): void {
    this.addBox('wall_north', 0, 2.25, -45, 92, 4.5, 1, Materials.concrete)
    this.addBox('wall_south_l', -24, 2.25, 42, 39, 4.5, 1, Materials.concrete)
    this.addBox('wall_south_r', 24, 2.25, 42, 39, 4.5, 1, Materials.concrete)
    this.addBox('gate_left', -4.8, 2, 42, 1.2, 4, 1, Materials.metal)
    this.addBox('gate_right', 4.8, 2, 42, 1.2, 4, 1, Materials.metal)
    this.addBox('wall_west', -45, 2.25, -1, 1, 4.5, 88, Materials.concrete)
    this.addBox('wall_east', 45, 2.25, -1, 1, 4.5, 88, Materials.concrete)

    for (const [x, z] of [[-39, -39], [39, -39], [-39, 35], [39, 35]] as const) {
      this.addBox(`watch_tower_${x}_${z}`, x, 3.6, z, 4.2, 7.2, 4.2, Materials.darkConcrete)
      this.addBox(`watch_roof_${x}_${z}`, x, 7.35, z, 5.2, 0.45, 5.2, Materials.metal)
      const l = new THREE.PointLight(0x6ad7ff, 1.5, 20)
      l.position.set(x, 6.8, z)
      this.tacticalLightGroup.add(l)
    }
  }

  private addCommandBuilding(): void {
    this.addBox('command_floor', 0, 0.1, -31, 22, 0.2, 16, Materials.darkConcrete)
    this.addBox('command_back_wall', 0, 2.6, -39, 22, 5.2, 0.8, Materials.concrete)
    this.addBox('command_left_wall', -11, 2.6, -31, 0.8, 5.2, 16, Materials.concrete)
    this.addBox('command_right_wall', 11, 2.6, -31, 0.8, 5.2, 16, Materials.concrete)
    this.addBox('command_front_wall_l', -6.8, 2.6, -23, 8.4, 5.2, 0.8, Materials.concrete)
    this.addBox('command_front_wall_r', 6.8, 2.6, -23, 8.4, 5.2, 0.8, Materials.concrete)
    this.addBox('command_roof', 0, 5.35, -31, 23, 0.6, 17, Materials.metal)
    this.addBox('server_rack_01', -7.5, 1.4, -36.5, 1.2, 2.8, 1.1, Materials.metal)
    this.addBox('server_rack_02', -5.4, 1.4, -36.5, 1.2, 2.8, 1.1, Materials.metal)
    this.addBox('server_rack_03', 7.0, 1.4, -36.5, 1.2, 2.8, 1.1, Materials.metal)
    this.addBox('center_table', 0, 0.65, -31, 4.8, 1.3, 2.1, Materials.metal)
    this.coverPoints.push(new THREE.Vector3(-9.5, 0, -25), new THREE.Vector3(9.5, 0, -25), new THREE.Vector3(-4.8, 0, -35.4), new THREE.Vector3(4.8, 0, -35.4))
  }

  private addWarehouse(): void {
    this.addBox('warehouse_a_back', -27, 2.9, -9, 16, 5.8, 0.8, Materials.concrete)
    this.addBox('warehouse_a_left', -35, 2.9, -2, 0.8, 5.8, 14, Materials.concrete)
    this.addBox('warehouse_a_right', -19, 2.9, -2, 0.8, 5.8, 14, Materials.concrete)
    this.addBox('warehouse_a_front_l', -31.5, 2.9, 5, 7, 5.8, 0.8, Materials.concrete)
    this.addBox('warehouse_a_front_r', -22.5, 2.9, 5, 7, 5.8, 0.8, Materials.concrete)
    this.addBox('warehouse_a_roof', -27, 6, -2, 17, 0.55, 15, Materials.metal)
    this.addBox('forklift_body', -24, 0.55, 2.2, 2.3, 1.1, 1.6, Materials.accent)
    this.addBox('forklift_mast', -23.05, 1.5, 1.3, 0.25, 3, 0.25, Materials.metal)
    this.addBox('warehouse_crate_01', -32, 1, -4, 2.2, 2, 2.2, Materials.wood)
    this.addBox('warehouse_crate_02', -30, 0.65, -6.6, 2, 1.3, 2, Materials.wood)
    this.coverPoints.push(new THREE.Vector3(-33.5, 0, 2), new THREE.Vector3(-21, 0, 2), new THREE.Vector3(-29, 0, -7))
  }

  private addContainerYard(): void {
    const colors = [Materials.containerBlue, Materials.containerRed, Materials.containerTan]
    const layout: Array<[number, number, number, number]> = [
      [17, -19, 8, 2.7], [28, -19, 8, 2.7], [23, -13, 8, 2.7], [35, -8, 8, 2.7],
      [18, 3, 8, 2.7], [30, 6, 8, 2.7], [22, 14, 8, 2.7]
    ]
    layout.forEach(([x, z, sx, sy], i) => {
      this.addBox(`container_${i}`, x, sy / 2, z, sx, sy, 2.8, colors[i % colors.length])
      this.coverPoints.push(new THREE.Vector3(x - sx / 2 - 1.2, 0, z), new THREE.Vector3(x + sx / 2 + 1.2, 0, z))
    })
    this.addBox('sandbag_line_01', 10, 0.55, -9, 6, 1.1, 1, Materials.sand)
    this.addBox('sandbag_line_02', 7, 0.55, 9, 1, 1.1, 7, Materials.sand)
    this.addBox('sandbag_line_03', 31, 0.55, 20, 6, 1.1, 1, Materials.sand)
    this.coverPoints.push(new THREE.Vector3(10, 0, -7.5), new THREE.Vector3(8.5, 0, 9), new THREE.Vector3(31, 0, 18.5))
  }

  private addVehicleDepot(): void {
    this.addBox('apc_body', -17, 1, 21, 5.8, 2, 2.8, Materials.metal)
    this.addBox('apc_turret', -17, 2.25, 21, 2.2, 0.8, 1.6, Materials.metal)
    this.addBox('apc_barrel', -17, 2.28, 18.9, 0.22, 0.22, 2.4, Materials.metal)
    this.addBox('truck_body', 16, 1.1, 26, 6.6, 2.2, 3.2, Materials.darkConcrete)
    this.addBox('truck_cabin', 11.8, 1.35, 26, 2.2, 2.7, 3, Materials.accent)
    this.addBox('fuel_tank', 26, 1.2, 29, 2.2, 2.4, 6.4, Materials.metal)
    this.coverPoints.push(new THREE.Vector3(-17, 0, 18), new THREE.Vector3(-17, 0, 24), new THREE.Vector3(14, 0, 23), new THREE.Vector3(21, 0, 28))
  }

  private addTrainingRange(): void {
    for (let i = 0; i < 7; i++) {
      const x = -30 + i * 6
      this.addBox(`target_panel_${i}`, x, 1.25, 35, 1.2, 2.5, 0.18, Materials.target)
    }
    this.addBox('range_cover_long', -14, 0.75, 11, 9, 1.5, 1.2, Materials.concrete)
    this.addBox('range_cover_short', -4, 0.65, 16, 1.2, 1.3, 5, Materials.concrete)
    this.coverPoints.push(new THREE.Vector3(-14, 0, 12.8), new THREE.Vector3(-4, 0, 18.8))
  }

  private addDecorAndLights(): void {
    for (let i = 0; i < 26; i++) {
      const x = -41 + Math.random() * 82
      const z = -41 + Math.random() * 82
      if (Math.abs(x) < 7 && z > -8 && z < 35) continue
      const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25 + Math.random() * 0.42), Materials.rock)
      rock.position.set(x, 0.18, z)
      rock.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2)
      rock.castShadow = true
      this.group.add(rock)
    }
    for (const [x, z] of [[-8, -18], [8, -18], [-18, 11], [14, 12], [31, -25], [-33, 24]] as const) {
      this.addBox(`light_pole_${x}_${z}`, x, 2.5, z, 0.22, 5, 0.22, Materials.metal)
      const light = new THREE.SpotLight(0xaad8ff, 2.2, 24, Math.PI / 5, 0.45, 1.5)
      light.position.set(x, 5.1, z)
      light.target.position.set(x + 1.5, 0, z + 1)
      this.tacticalLightGroup.add(light, light.target)
    }
  }

  private addMissionObjects(): void {
    this.terminal = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.65, 0.72), Materials.glass)
    this.terminal.position.set(0, 0.83, -37.8)
    this.terminal.name = 'intel_terminal'
    this.group.add(this.terminal)
    this.interactables.set('intel_terminal', this.terminal)
    const terminalLight = new THREE.PointLight(0x51d6ff, 3.2, 12)
    terminalLight.position.set(0, 2.4, -37.2)
    this.group.add(terminalLight)

    this.extractionPosition.set(0, 0, 36)
    this.extractionZone = new THREE.Mesh(
      new THREE.CylinderGeometry(3.4, 3.4, 0.08, 72),
      new THREE.MeshStandardMaterial({ color: 0x1cc7ff, emissive: 0x07334a, transparent: true, opacity: 0.58 })
    )
    this.extractionZone.position.copy(this.extractionPosition).setY(0.04)
    this.extractionZone.name = 'extraction_zone'
    this.group.add(this.extractionZone)
  }

  private addSupplyCrate(id: string, x: number, y: number, z: number, type: SupplyType): void {
    const mat = type === 'ammo' ? Materials.ammo : type === 'armor' ? Materials.armor : Materials.medkit
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 1.1), mat)
    mesh.position.set(x, y, z)
    mesh.name = id
    mesh.castShadow = true
    this.group.add(mesh)
    this.interactables.set(id, mesh)
    this.supplyTypes.set(id, type)
    this.physics.addBox(id, mesh.position, new THREE.Vector3(0.65, 0.45, 0.55), mesh)
  }

  private addBox(id: string, x: number, y: number, z: number, sx: number, sy: number, sz: number, mat: THREE.Material, collide = true): THREE.Mesh {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), mat)
    mesh.position.set(x, y, z)
    mesh.castShadow = true
    mesh.receiveShadow = true
    mesh.name = id
    this.group.add(mesh)
    if (collide) this.physics.addBox(id, mesh.position, new THREE.Vector3(sx / 2, sy / 2, sz / 2), mesh)
    return mesh
  }
}
