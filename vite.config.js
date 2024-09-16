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
  }
})
