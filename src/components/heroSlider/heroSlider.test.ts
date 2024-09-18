import HeroSlider from './HeroSlider'
import { products } from '../../mock/heroSliderMockData'

describe('HeroSlider Component', () => {
  let heroSliderElement: HTMLElement | null

  beforeEach(() => {
    // Register the HeroSlider component and add it to the DOM before each test
    if (!customElements.get('hero-slider')) {
      customElements.define('hero-slider', HeroSlider)
    }

    // Add the HeroSlider component to the document body
    document.body.innerHTML = `<hero-slider></hero-slider>`
    heroSliderElement = document.querySelector('hero-slider')
  })

  afterEach(() => {
    // Clean up the DOM after each test by clearing the body
    document.body.innerHTML = ''
    heroSliderElement = null
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
})
