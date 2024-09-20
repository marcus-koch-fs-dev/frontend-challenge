import HeroButton from './HeroButton'

describe('HeroButton component', () => {
  let buttonElement: HTMLElement | null

  beforeEach(() => {
    // Register HeroButton component
    if (!customElements.get('hero-button')) {
      customElements.define('hero-button', HeroButton)
    }

    // Add hero-button to the DOM before each test
    document.body.innerHTML = `<hero-button href="https://example.com">Hello World</hero-button>`
    buttonElement = document.querySelector('hero-button')
  })

  afterEach(() => {
    // Clean up the DOM after each test
    document.body.innerHTML = ''
    buttonElement = null
  })

  it('should add the button to the DOM', () => {
    expect(buttonElement).toBeInTheDocument()
  })

  it('should render an <a> element', () => {
    const renderedLink = buttonElement?.querySelector('a')
    expect(renderedLink).toBeInTheDocument()
  })

  it('should add the correct class based on buttonStyle', () => {
    const renderedLink = buttonElement?.querySelector('a')
    expect(renderedLink?.classList).toContain('hero-button--full')
  })

  it('should have the correct href attribute', () => {
    const renderedLink = buttonElement?.querySelector('a')
    expect(renderedLink?.getAttribute('href')).toBe('https://example.com')
  })
})
