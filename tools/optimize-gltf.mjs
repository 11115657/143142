import { spawnSync } from 'node:child_process'

const [input, output = input?.replace(/\.glb$/i, '.optimized.glb')] = process.argv.slice(2)
if (!input) {
  console.log('Usage: node tools/optimize-gltf.mjs public/assets/path/input.glb [output.glb]')
  console.log('Recommended install: npm i -D @gltf-transform/cli')
  process.exit(0)
}

const args = ['gltf-transform', 'optimize', input, output, '--compress', 'draco', '--texture-compress', 'webp', '--texture-size', '2048']
const result = spawnSync('npx', args, { stdio: 'inherit', shell: true })
if (result.status !== 0) process.exit(result.status ?? 1)
