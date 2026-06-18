import { readdir, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'

const root = new URL('../public/assets/', import.meta.url)
const out = new URL('../public/assets-manifest.json', import.meta.url)
const files = []

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) await walk(path)
    else files.push(relative(root.pathname, path).replaceAll('\\\\', '/'))
  }
}

await walk(root.pathname)
await writeFile(out, JSON.stringify({ generatedAt: new Date().toISOString(), files }, null, 2))
console.log(`Wrote ${files.length} assets to public/assets-manifest.json`)
