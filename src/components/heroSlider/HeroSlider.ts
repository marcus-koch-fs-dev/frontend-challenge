import './heroSlider.scss'
import {
  ProductDetails,
  products,
  Products as ProductsType
} from '../../mock/heroSliderMockData'

/**
 * @docType class
 * @class
 * @name HeroSlider
 * @description
 * The HeroSlider component displays a slider with dynamic content. It includes buttons to navigate through the slides,
 * and renders product information such as title, description, and background image.
 */
export default class HeroSlider extends HTMLElement {
  products: ProductsType = [] // Array to hold product details
  activeSliderNo: number = 0 // Tracks the current slide index
  activeSliderId: string | null = products[0]?.id.toString() ?? null // Clarify the indicator to highlight
  slideLength: number = products.length // Total number of slides
  prevButton: HTMLButtonElement | null = null // Reference to the "Previous" button
  nextButton: HTMLButtonElement | null = null // Reference to the "Next" button
  sliderIndicators: HTMLElement | null = null // Reference to the slider indicators container

  lowerBorder: number = 0 // Lower boundary for the indicators slice
  upperBorder: number = 4 // Upper boundary for the indicators slice

  // Constant for maximum number of indicators
  readonly MAX_INDICATORS: number = 4

  private touchStartX: number = 0 // Start point of touch at x-axis
  private touchEndX: number = 0 // Endpoint of touch at x-axis
  private minSwipeDistance: number = 50 // Min swipe distance

  constructor() {
    super()
    this.showNextSlide = this.showNextSlide.bind(this)
    this.showPreviousSlide = this.showPreviousSlide.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  // Called when the element is added to the DOM
  connectedCallback() {
    this.render()
    this.setupEventListeners()
  }

  // Called when the element is removed from the DOM
  disconnectedCallback() {
    this.cleanupEventListeners()
  }

  // Set up event listeners into the DOM
  setupEventListeners() {
    this.prevButton = this.querySelector('.hero-slider__button--previous')
    this.nextButton = this.querySelector('.hero-slider__button--next')
    this.sliderIndicators = this.querySelector(
      '.hero-slider__slider-indicators'
    )

    this.addEventListener('touchstart', this.handleTouchStart, {
      passive: false
    })
    this.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.addEventListener('touchend', this.handleTouchEnd, { passive: false })

    if (this.prevButton && this.nextButton) {
      this.prevButton.addEventListener('click', this.showPreviousSlide)
      this.nextButton.addEventListener('click', this.showNextSlide)
    }

    // Event-Delegation with Bubbling
    if (this.sliderIndicators) {
      this.sliderIndicators.addEventListener('click', this.handleSlideClick)
    }
  }

  // Remove event listeners when the component is removed
  cleanupEventListeners() {
    this.addEventListener('touchstart', this.handleTouchStart, {
      passive: false
    })
    this.addEventListener('touchmove', this.handleTouchMove, { passive: false })
    this.addEventListener('touchend', this.handleTouchEnd, { passive: false })

    if (this.prevButton && this.nextButton) {
      this.prevButton.removeEventListener('click', this.showPreviousSlide)
      this.nextButton.removeEventListener('click', this.showNextSlide)
    }

    if (this.sliderIndicators) {
      this.sliderIndicators.removeEventListener('click', this.handleSlideClick)
    }
  }

  handleTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX
  }

  handleTouchMove(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX
  }

  handleTouchEnd() {
    const swipeDistance = this.touchEndX - this.touchStartX

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance < 0) {
        this.showNextSlide()
      } else {
        this.showPreviousSlide()
      }
    }
  }

  // Handles click events on slide indicators (event delegation)
  handleSlideClick = (event: Event) => {
    const target = event.target as HTMLElement

    if (target.classList.contains('hero-slider__slide-indicator')) {
      const index = Array.from(this.sliderIndicators!.children).indexOf(
        target.parentElement!
      )
      this.showSelectSlide(index)
    }
  }

  // Navigate to the next slide and re-render the slider
  showNextSlide() {
    if (this.activeSliderNo === this.slideLength - 1) {
      // If on the last slide, loop back to the first slide
      this.activeSliderNo = 0
      this.activeSliderId = products[0].id.toString()
      this.lowerBorder = 0
      this.upperBorder = Math.min(this.MAX_INDICATORS, this.slideLength) // Show a maximum of 4 indicators
    } else {
      this.activeSliderNo++
      this.activeSliderId = products[this.activeSliderNo].id.toString()

      // Adjust indicator borders if necessary
      if (this.activeSliderNo >= this.upperBorder) {
        this.lowerBorder = this.activeSliderNo
        this.upperBorder = Math.min(
          this.activeSliderNo + this.MAX_INDICATORS,
          this.slideLength
        )
      }
    }
    this.render()
  }

  // Navigate to the previous slide and re-render the slider
  showPreviousSlide() {
    if (this.activeSliderNo === 0) {
      // If at the first slide, loop to the last slide
      this.activeSliderNo = this.slideLength - 1
      this.activeSliderId = products[this.activeSliderNo].id.toString()

      // Show the last indicators based on the remaining slides
      this.lowerBorder =
        this.slideLength - (products.length % this.MAX_INDICATORS)
      this.upperBorder = this.slideLength
    } else {
      this.activeSliderNo--
      this.activeSliderId = products[this.activeSliderNo].id.toString()

      // Adjust the indicator borders if necessary
      if (this.activeSliderNo < this.lowerBorder) {
        this.lowerBorder =
          this.activeSliderNo - 3 >= 0 ? this.activeSliderNo - 3 : 0
        this.upperBorder = this.activeSliderNo + 1
      }
    }
    this.render()
  }

  // Show the selected slide based on its index
  showSelectSlide(index: number) {
    this.activeSliderNo = index
    this.activeSliderId = products[index].id.toString()
    this.render()
  }

  // Generate the HTML for the current slide's content
  updateHeroImage(): string {
    const bgImage: string = products[this.activeSliderNo]?.images[0] ?? ''

    return `
      <div class="hero-slider__overlay">
        <img class="hero-slider__bg-image" alt="Background Image" src="${bgImage}" />
      </div>`
  }
  updateHeroText(): string {
    const headline: string =
      products[this.activeSliderNo]?.title ?? 'Default Headline'
    const description: string =
      products[this.activeSliderNo]?.description ?? 'Default Description'

    return `
      <h1 class="hero-slider__headline">${headline}</h1>
      <p class="hero-slider__description">${description}</p>
    `
  }

  // Generate the list of slide indicators
  indicatorList(): string {
    return products
      .slice(this.lowerBorder, this.upperBorder)
      .map((product: ProductDetails) => {
        const isActive =
          this.activeSliderId === product.id.toString()
            ? 'hero-slider__slide-indicator--active'
            : ''

        return `
        <li class="hero-slider__slide-item" id=${product.id.toString()} key=${product.id}>
          <span class="hero-slider__slide-indicator ${isActive}"></span>
        </li>
      `
      })
      .join('')
  }

  // Render the HeroSlider component's HTML structure
  render() {
    this.innerHTML = `
          <section class="hero-slider">
            ${this.updateHeroImage()}
            <div class="hero-slider__content-alignment">
              ${this.updateHeroText()}
              <div class="hero-slider__action-bar">
                <hero-button>Mehr Infos 
                <i class="fas fa-arrow-right"></i>
                </hero-button>
                <hero-button buttonStyle="outlined">Kontakt</hero-button>
              </div>
              </div>
              <div class="hero-slider__slider-wrapper">
                <ul class="hero-slider__slider-indicators">
                ${this.indicatorList()}
                </ul>
                <div class="hero-slider__slider-controls">
                  <button class="hero-slider__button hero-slider__button--previous">
                    <i class="fas fa-chevron-left hero-slider__icon hero-slider__icon--previous"></i>
                  </button>
                  <button class="hero-slider__button hero-slider__button--next">
                    <i class="fas fa-chevron-right hero-slider__icon hero-slider__icon--next"></i>
                  </button>
                </div>
              </div>
          </section>
        `.trim()
    this.setupEventListeners() // Set up event listeners after rendering
  }
}
