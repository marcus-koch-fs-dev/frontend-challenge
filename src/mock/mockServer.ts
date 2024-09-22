import { http, HttpResponse } from 'msw'
import { products } from './heroSliderMockData'

// Intercept "GET https://example.com/products" requests
export const restHandlers = [
  http.get('https://example.com/products', () => {
    return HttpResponse.json({ products })
  })
]
