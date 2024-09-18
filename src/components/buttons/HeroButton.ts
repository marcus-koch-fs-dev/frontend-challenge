import './heroButton.scss'

type HeroButtonStyleTypes = 'outlined' | 'full'

export default class HeroButton extends HTMLElement {
  buttonStyle: HeroButtonStyleTypes
  href: string | null = null

  constructor() {
    super()
    this.buttonStyle =
      (this.getAttribute('buttonStyle') as HeroButtonStyleTypes) || 'full'
    this.href = this.getAttribute('href') || null
    this.render()
  }

  // Specifies the attributes to observe for changes
  static get observedAttributes(): string[] {
    return ['buttonStyle', 'href']
  }

  // Called when an observed attribute changes
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    // If the 'buttonStyle' attribute value has changed, update it
    if (oldValue !== newValue) {
      switch (name) {
        case 'buttonStyle':
          this.buttonStyle = (newValue as HeroButtonStyleTypes) || 'full'
          break
        case 'href':
          this.href = newValue || '#'
          break
      }
      // Re-render the element to reflect the changes
      this.render()
    }
  }

  // Renders the button element based on the current attributes and content
  render(): void {
    const label = this.innerHTML || 'Click Me'
    const styleClass = `hero-button--${this.buttonStyle}`

    this.innerHTML = `
        <a href="${this.href}" class="hero-button ${styleClass}">
          <span class="hero-button__label">${label}</span>
        </a>      
      `.trim()
  }
}
