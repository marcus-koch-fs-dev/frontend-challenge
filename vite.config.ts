/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240 // Compression until 10kB
    })
  ],
  server: {
    open: true
  },
  css: {
    postcss: {
      plugins: [autoprefixer()]
    }
  },
  test: {
    globals: true, // Use functions without import
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTest.ts'] // Path to test config
  }
})
