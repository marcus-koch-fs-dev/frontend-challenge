import HeroButton from './HeroButton'

describe('HeroButton component', () => {
  let buttonElement: HTMLElement | null

  beforeAll(() => {
    // Register HeroButton component
    customElements.define('hero-button', HeroButton)

    // Add hero-button to the DOM
    document.body.innerHTML = `<hero-button actionType='Link'>Hello World</hero-button>`
    buttonElement = document.querySelector('hero-button')
  })

  it('should add the button to the DOM', () => {
    expect(buttonElement).toBeInTheDocument()
  })

  it('should have the actionType attribute set to "Link"', () => {
    expect(buttonElement?.getAttribute('actionType')).toBe('Link')
  })

  it('should add the correct class based on actionType', () => {
    const renderedButton = buttonElement?.querySelector('button')
    expect(renderedButton?.classList).toContain('action-type-Link')
  })
})
