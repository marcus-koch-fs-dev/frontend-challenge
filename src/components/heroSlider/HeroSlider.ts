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
  slideLength: number = products.length // Total number of slides
  prevButton: HTMLButtonElement | null = null // Reference to the "Previous" button
  nextButton: HTMLButtonElement | null = null // Reference to the "Next" button
  sliderIndicators: HTMLElement | null = null // Reference to the slider indicators container

  constructor() {
    super()
    // Bind methods to the class instance
    this.showNextSlide = this.showNextSlide.bind(this)
    this.showPreviousSlide = this.showPreviousSlide.bind(this)
    this.showSelectSlide = this.showSelectSlide.bind(this)
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
    if (this.prevButton && this.nextButton) {
      this.prevButton.removeEventListener('click', this.showPreviousSlide)
      this.nextButton.removeEventListener('click', this.showNextSlide)
    }

    if (this.sliderIndicators) {
      this.sliderIndicators.removeEventListener('click', this.handleSlideClick)
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
      this.activeSliderNo = 0
    } else {
      this.activeSliderNo++
    }
    this.render()
  }

  // Navigate to the previous slide and re-render the slider
  showPreviousSlide() {
    if (this.activeSliderNo === 0) {
      this.activeSliderNo = this.slideLength - 1
    } else {
      this.activeSliderNo--
    }
    this.render()
  }

  // Show the selected slide based on its index
  showSelectSlide(index: number) {
    this.activeSliderNo = index
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
      .map((product: ProductDetails, idx: number) => {
        const isActive =
          this.activeSliderNo === idx
            ? 'hero-slider__slide-indicator--active'
            : ''

        return `
        <li class="hero-slider__slide-item" key=${product.id}>
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
