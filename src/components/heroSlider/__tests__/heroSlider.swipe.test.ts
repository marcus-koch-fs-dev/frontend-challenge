import { setupGlobalTests } from '../../../tests/setupTest'
import '@testing-library/jest-dom'
import HeroSlider from '../HeroSlider'
import { products } from '../../../mock/heroSliderMockData'
import { fireEvent } from '@testing-library/dom'

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

  // Test swipe left functionality to move to the next slide
  it('should swipe to the next slide on swipe left', () => {
    // Simulate the touchstart event (finger start position)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchstart', {
        changedTouches: [{ identifier: 0, screenX: 300, screenY: 0 } as Touch] // Start at X = 300px
      })
    )

    // Simulate the touchmove event (finger moves left)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchmove', {
        changedTouches: [{ identifier: 0, screenX: 100, screenY: 0 } as Touch] // Moves to X = 100px
      })
    )

    // Simulate the touchend event (finger lifted off the screen)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchend', {
        changedTouches: [{ identifier: 0, screenX: 100, screenY: 0 } as Touch]
      })
    )

    // Check if the next slide is displayed (Index 1)
    const headline = heroSliderElement?.querySelector(
      '.hero-slider__headline'
    )?.textContent
    expect(headline).toEqual(products[1].title) // Expect the second slide title to be displayed
  })

  // Test swipe right functionality to move to the previous slide
  it('should swipe to the previous slide on swipe right', () => {
    // Set the current slide to the second slide (Index 1)
    ;(heroSliderElement as typeof heroSliderElement).activeSliderNo = 1
    heroSliderElement?.render() // Update the render

    // Simulate the touchstart event (finger start position)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchstart', {
        changedTouches: [{ identifier: 0, screenX: 100, screenY: 0 } as Touch] // Start at X = 100px
      })
    )

    // Simulate the touchmove event (finger moves right)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchmove', {
        changedTouches: [{ identifier: 0, screenX: 300, screenY: 0 } as Touch] // Moves to X = 300px
      })
    )

    // Simulate the touchend event (finger lifted off the screen)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchend', {
        changedTouches: [{ identifier: 0, screenX: 300, screenY: 0 } as Touch]
      })
    )

    // Check if the previous slide is displayed (Index 0)
    const headline = heroSliderElement?.querySelector(
      '.hero-slider__headline'
    )?.textContent
    expect(headline).toEqual(products[0].title) // Expect the first slide title to be displayed
  })
})
