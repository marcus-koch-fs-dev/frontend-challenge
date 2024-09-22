import { setupServer } from 'msw/node'
import { restHandlers } from '../mock/mockServer'

export const server = setupServer(...restHandlers)

export function setupGlobalTests() {
  // Start the mock server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  // Close the mock server after all tests
  afterAll(() => server.close())

  // Reset the server state and clean up after each test
  afterEach(() => {
    server.resetHandlers()
    document.body.innerHTML = ''
  })
}
