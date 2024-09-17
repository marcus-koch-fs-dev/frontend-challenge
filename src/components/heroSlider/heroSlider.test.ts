import HeroSlider from './HeroSlider'

describe('Render Hero-Slider component', () => {
  let heroSliderElement: Element | null
  let headlineElem: Element | null | undefined

  beforeAll(() => {
    // Register Hero Component
    customElements.define('hero-slider', HeroSlider)

    // Add HeroSlider to the DOM
    document.body.innerHTML = `<hero-slider></hero-slider>`
    heroSliderElement = document.querySelector('hero-slider')
    headlineElem = heroSliderElement?.shadowRoot?.querySelector(
      '.hero-slider__title'
    )
  })

  it('Render h1 with the correct title: Hello World', () => {
    const headlineText = headlineElem?.textContent
    expect(headlineText).toEqual('Hello World')
  })

  it('Render h1 and test "Good Bye World" does not match title: Hello World', () => {
    const headlineText = headlineElem?.textContent
    expect(headlineText).not.toEqual('Good Bye World')
  })
})
