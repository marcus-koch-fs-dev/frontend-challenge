import '@testing-library/jest-dom' // Minimal import
import { afterEach } from 'vitest'

// DOM cleanup after testing
afterEach(() => {
  document.body.innerHTML = ''
})
