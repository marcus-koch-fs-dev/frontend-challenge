import { setupGlobalTests } from '../../../tests/setupTest'
import '@testing-library/jest-dom'
import HeroSlider from '../HeroSlider'
import { products } from '../../../mock/heroSliderMockData'

describe('HeroSlider Component', () => {
  setupGlobalTests()

  let heroSliderElement: HTMLElement | null

  beforeEach(async () => {
    if (!customElements.get('hero-slider')) {
      customElements.define('hero-slider', HeroSlider)
    }

    // Render the HeroSlider component
    document.body.innerHTML = `<hero-slider url='https://example.com/products'></hero-slider>`
    heroSliderElement = document.querySelector('hero-slider')

    // Wait for the products to load
    await heroSliderElement?.fetchProducts() // Wait for data
  })

  it('should be in the DOM', () => {
    // Check if the HeroSlider component is in the DOM
    expect(heroSliderElement).toBeInTheDocument()
  })

  // Test if the first slide is displayed initially
  it('should display the first slide initially', () => {
    const headline = heroSliderElement?.querySelector(
      '.hero-slider__headline'
    )?.textContent
    expect(headline).toEqual(products[0].title) // Expect the first slide title to be displayed
  })
})
