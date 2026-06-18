export type AssetRecord = {
  id: string
  type: 'gltf' | 'texture' | 'audio' | 'json'
  url: string
  required?: boolean
}
