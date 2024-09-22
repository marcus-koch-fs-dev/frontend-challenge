import './heroSlider.scss'
import {
  ProductDetails,
  Products as ProductsType
} from '../../mock/heroSliderMockData'

type ApiResponse = {
  products: ProductsType
  [key: string]: unknown
}

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
  activeSliderId: string | null = null // Clarify the indicator to highlight
  slideLength: number = this.products.length // Total number of slides
  prevButton: HTMLButtonElement | null = null // Reference to the "Previous" button
  nextButton: HTMLButtonElement | null = null // Reference to the "Next" button
  sliderIndicators: HTMLElement | null = null // Reference to the slider indicators container
  url: string = ''

  // Constant for maximum number of indicators
  readonly MAX_INDICATORS: number = 4
  lowerBorder: number = 0 // Lower boundary for the indicators slice
  upperBorder: number = 4 // Upper boundary for the indicators slice

  private touchStartX: number = 0 // Start point of touch at x-axis
  private touchEndX: number = 0 // Endpoint of touch at x-axis
  private minSwipeDistance: number = 50 // Min swipe distance

  constructor() {
    super()
    this.showNextSlide = this.showNextSlide.bind(this)
    this.showPreviousSlide = this.showPreviousSlide.bind(this)
    this.handleSlideClick = this.handleSlideClick.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  }

  // Specifies which attributes should be observed for changes.
  static get observedAttributes(): string[] {
    return ['url']
  }

  // Called when the element is added to the DOM
  async connectedCallback() {
    // Initialize the activeSliderId with the first product's ID, if available
    await this.fetchProducts()
    if (this.products.length > 0) {
      this.activeSliderId = this.products[0]?.id.toString()
      this.preLoadImages()
    }
    this.render()
    this.setupEventListeners()
  }

  // Called when the element is removed from the DOM
  disconnectedCallback() {
    this.cleanupEventListeners()
  }

  // Called whenever one of the observed attributes is changed.
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    if (oldValue !== newValue) {
      switch (name) {
        case 'url':
          this.url = newValue || ''
          break
      }

      this.render()
    }
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

  //Fetches product data from the specified URL.
  async fetchProducts(): Promise<void> {
    try {
      const response = await fetch(this.url)

      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }

      const data: ApiResponse = await response.json()
      this.products = data.products

      this.slideLength = this.products.length
      if (this.products.length > 0) {
        this.activeSliderId = this.products[0].id.toString()
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching products:', error.message)
        throw new Error(error.message)
      } else {
        console.error('Unknown error fetching products:', error)
        throw new Error('Fetch error')
      }
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
  handleSlideClick(event: Event) {
    // Click on span
    const target = event.target as HTMLElement

    // Listening to event on the slide indicator
    if (target.classList.contains('hero-slider__slide-indicator')) {
      const parentLi = target.closest('li') // Find closest element in the hierarchy
      const productId = parentLi?.getAttribute('id')

      if (productId) {
        // Set the new Id, if was found
        this.showSelectSlide(productId)
      }
    }
  }

  // Navigate to the next slide and re-render the slider
  showNextSlide() {
    if (this.activeSliderNo === this.slideLength - 1) {
      // If on the last slide, loop back to the first slide
      this.activeSliderNo = 0
      this.activeSliderId = this.products[0].id.toString()
      this.lowerBorder = 0
      this.upperBorder = Math.min(this.MAX_INDICATORS, this.slideLength) // Show a maximum of 4 indicators
    } else {
      this.activeSliderNo++
      this.activeSliderId = this.products[this.activeSliderNo].id.toString()

      // Adjust indicator borders if necessary
      if (this.activeSliderNo >= this.upperBorder) {
        this.lowerBorder = this.activeSliderNo
        this.upperBorder = Math.min(
          this.activeSliderNo + this.MAX_INDICATORS,
          this.slideLength
        )
      }
    }
    this.preLoadImages()
    this.render()
  }

  // Navigate to the previous slide and re-render the slider
  showPreviousSlide() {
    if (this.activeSliderNo === 0) {
      // If at the first slide, loop to the last slide
      this.activeSliderNo = this.slideLength - 1
      this.activeSliderId = this.products[this.activeSliderNo].id.toString()

      // Show the last indicators based on the remaining slides
      this.lowerBorder =
        this.slideLength - (this.products.length % this.MAX_INDICATORS)
      this.upperBorder = this.slideLength
    } else {
      this.activeSliderNo--
      this.activeSliderId = this.products[this.activeSliderNo].id.toString()

      // Adjust the indicator borders if necessary
      if (this.activeSliderNo < this.lowerBorder) {
        this.lowerBorder =
          this.activeSliderNo - 3 >= 0 ? this.activeSliderNo - 3 : 0
        this.upperBorder = this.activeSliderNo + 1
      }
    }
    this.render()
  }

  // Show the selected slide based on the product ID
  showSelectSlide(productId: string) {
    const productIndex = this.products.findIndex(
      (product) => product.id.toString() === productId
    )

    // When product was found, activate new Slider
    if (productIndex !== -1) {
      this.activeSliderNo = productIndex
      this.activeSliderId = productId

      this.preLoadImages()
      this.render()
    }
  }

  // Generate the HTML for the current slide's content
  updateHeroImage(): string {
    const bgImage: string = this.products[this.activeSliderNo]?.images[0] ?? ''

    return `
      <div class="hero-slider__overlay">
        <img class="hero-slider__bg-image" alt="Background Image" src="${bgImage}" />
      </div>`
  }
  updateHeroText(): string {
    const headline: string =
      this.products[this.activeSliderNo]?.title ?? 'Default Headline'
    const description: string =
      this.products[this.activeSliderNo]?.description ?? 'Default Description'

    return `
      <h1 class="hero-slider__headline">${headline}</h1>
      <p class="hero-slider__description">${description}</p>
    `
  }

  /**
   * Preloads the previous, current, and next images in the slider.
   * Ensures that if the current slide is the first or last, the
   * previous and next slides wrap around the array.
   */
  preLoadImages() {
    let pre = this.activeSliderNo - 1
    const cur = this.activeSliderNo
    let next = this.activeSliderNo + 1

    // If the current slide is the first, wrap 'pre' to the last slide
    if (pre < 0) {
      pre = this.products.length - 1
    }

    // If the current slide is the last, wrap 'next' to the first slide
    if (next >= this.products.length) {
      next = 0
    }

    // Preload images for previous, current, and next slides
    ;[pre, cur, next].forEach((idxNo) => {
      const product = this.products[idxNo]
      const img = new Image()
      img.src = product.images[0]
    })
  }

  // Generate the list of slide indicators
  indicatorList(): string {
    return this.products
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
