import HeroSlider from './HeroSlider'
import { fireEvent } from '@testing-library/dom'
import { products } from '../../mock/heroSliderMockData'
import { setupServer } from 'msw/node'
import { restHandlers } from '../../mock/mockServer'

describe('HeroSlider Component', () => {
  let heroSliderElement: HTMLElement | null
  const server = setupServer(...restHandlers)

  // Start the mock server before all tests
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))

  // Close the mock server after all tests
  afterAll(() => server.close())

  // Reset the server state after each test
  afterEach(() => {
    // Reset the mock server handlers after each test
    server.resetHandlers()

    // Clean up the DOM
    document.body.innerHTML = ''
    heroSliderElement = null
  })

  // Perform asynchronous operations before each test
  beforeEach(async () => {
    // Register the HeroSlider component and add it to the DOM before each test
    if (!customElements.get('hero-slider')) {
      customElements.define('hero-slider', HeroSlider)
    }

    // Add the HeroSlider component to the document body
    document.body.innerHTML = `<hero-slider url='https://example.com/products'></hero-slider>`
    heroSliderElement = document.querySelector('hero-slider')

    // Wait for the products to load
    await heroSliderElement?.fetchProducts() // Wait for the asynchronous data loading
  })

  it('should be in the DOM', () => {
    // Check if the HeroSlider component is in the DOM
    expect(heroSliderElement).toBeInTheDocument()
  })

  it('should have "Next" and "Previous" buttons registered in the DOM', () => {
    // Find the next and previous buttons inside the HeroSlider component
    const nextButton = heroSliderElement?.querySelector(
      '.hero-slider__button--next'
    )
    const prevButton = heroSliderElement?.querySelector(
      '.hero-slider__button--previous'
    )

    // Check if the buttons are present in the DOM
    expect(nextButton).toBeInTheDocument()
    expect(prevButton).toBeInTheDocument()
  })

  it('should navigate slides correctly on button clicks', () => {
    // Find the next and previous buttons
    const nextButton = heroSliderElement?.querySelector(
      '.hero-slider__button--next'
    ) as HTMLButtonElement
    const prevButton = heroSliderElement?.querySelector(
      '.hero-slider__button--previous'
    ) as HTMLButtonElement

    // Ensure the buttons are found before proceeding
    if (!nextButton || !prevButton) {
      throw new Error('Next or Previous button not found.')
    }

    // Check that the first slide is displayed initially (Index 0)
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[0].title)

    // Simulate a click on the next button and check if the second slide is shown
    nextButton.click()
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[1].title)

    // Simulate a click on the previous button and check if the first slide is shown again
    prevButton.click()
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[0].title)

    // Simulate another click on the previous button and check if the last slide is shown
    prevButton.click()
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[products.length - 1].title)
  })

  it('should go to third slide and then back to second slide with previous button', () => {
    const prevButton = heroSliderElement?.querySelector(
      '.hero-slider__button--previous'
    ) as HTMLButtonElement
    if (!prevButton) {
      throw new Error('Next or Previous button not found.')
    }

    // Find the slide indicators (simulate a click on the third slide indicator)
    const thirdSlideIndicator = heroSliderElement?.querySelectorAll(
      '.hero-slider__slide-indicator'
    )[2] as HTMLElement

    if (!thirdSlideIndicator) {
      throw new Error('Third slide indicator not found.')
    }

    // Simulate clicking on the third slide indicator
    thirdSlideIndicator.click()
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[2].title)

    // Simulate clicking on the previous button
    prevButton.click()
    expect(
      heroSliderElement?.querySelector('.hero-slider__headline')?.textContent
    ).toEqual(products[1].title)
  })

  // Test if the first slide is displayed initially
  it('should display the first slide initially', () => {
    const headline = heroSliderElement?.querySelector(
      '.hero-slider__headline'
    )?.textContent
    expect(headline).toEqual(products[0].title) // Expect the first slide title to be displayed
  })

  // Test swipe left functionality to move to the next slide
  it('should swipe to the next slide on swipe left', () => {
    // Simulate the touchstart event (finger start position)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchstart', {
        changedTouches: [{ screenX: 300 }] as any // Start at X = 300px
      })
    )

    // Simulate the touchmove event (finger moves left)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchmove', {
        changedTouches: [{ screenX: 100 }] as any // Moves to X = 100px
      })
    )

    // Simulate the touchend event (finger lifted off the screen)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchend', {
        changedTouches: [{ screenX: 100 }] as any
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
    ;(heroSliderElement as any).activeSliderNo = 1
    heroSliderElement?.render() // Update the render

    // Simulate the touchstart event (finger start position)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchstart', {
        changedTouches: [{ screenX: 100 }] as any // Start at X = 100px
      })
    )

    // Simulate the touchmove event (finger moves right)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchmove', {
        changedTouches: [{ screenX: 300 }] as any // Moves to X = 300px
      })
    )

    // Simulate the touchend event (finger lifted off the screen)
    fireEvent(
      heroSliderElement!,
      new TouchEvent('touchend', {
        changedTouches: [{ screenX: 300 }] as any
      })
    )

    // Check if the previous slide is displayed (Index 0)
    const headline = heroSliderElement?.querySelector(
      '.hero-slider__headline'
    )?.textContent
    expect(headline).toEqual(products[0].title) // Expect the first slide title to be displayed
  })
})
