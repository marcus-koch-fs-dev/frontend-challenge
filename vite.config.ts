/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'

export default defineConfig({
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
