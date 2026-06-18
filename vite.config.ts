import { defineConfig } from 'vite'

// base: './' makes the build work both at a GitHub Pages project URL
// such as /repo-name/ and from a root-domain custom deployment.
export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          return undefined
        }
      }
    }
  },
  server: {
    open: true
  }
})
