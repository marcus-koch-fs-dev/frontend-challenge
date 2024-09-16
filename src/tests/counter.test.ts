import { describe, it, expect } from 'vitest'
import { setupCounter } from '../counter'

// Testing the test environment
describe('Testing the increment button', () => {
  let incrementBtn: HTMLButtonElement

  // Init button
  beforeEach(() => {
    incrementBtn = document.createElement('button')
    incrementBtn.id = 'counter'

    setupCounter(incrementBtn)
  })

  it('Counter has the value: 0', () => {
    expect(incrementBtn.innerHTML).toBe('count is 0')
  })

  it('After one click, the counter has the value: 1', () => {
    incrementBtn.click()

    expect(incrementBtn.innerHTML).toBe('count is 1')
  })

  it('After one click, the counter has the value: 2', () => {
    incrementBtn.click()
    incrementBtn.click()

    expect(incrementBtn.innerHTML).toBe('count is 2')
  })
})
