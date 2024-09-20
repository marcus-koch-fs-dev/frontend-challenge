/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import autoprefixer from 'autoprefixer'
import compression from 'vite-plugin-compression'
import sassDts from 'vite-plugin-sass-dts'

export default defineConfig({
  plugins: [
    sassDts(),
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
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/sass/_base.scss";` // Global import of _base.scss
      }
    }
  },
  test: {
    globals: true, // Global import of test methods
    environment: 'jsdom',
    setupFiles: ['./src/tests/setupTest.ts']
  }
})
