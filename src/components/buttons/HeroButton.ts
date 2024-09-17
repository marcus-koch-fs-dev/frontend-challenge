import './heroButton.scss'

// Defines the possible action types for the button, either 'Link' or 'Contact'
type HeroButtonActionTypes = 'Link' | 'Contact'

// Defines a new web component named 'HeroButton', extending from HTMLElement
export default class HeroButton extends HTMLElement {
  // Stores the action type of the button
  actionType: HeroButtonActionTypes

  constructor() {
    super()

    // Initializes the action type based on the 'actionType' attribute or defaults to 'Link'
    this.actionType =
      (this.getAttribute('actionType') as HeroButtonActionTypes) || 'Link'

    // Renders the button based on the initial attributes and content
    this.render()
  }

  // Specifies the attributes to observe for changes
  static get observedAttributes(): string[] {
    return ['actionType']
  }

  // Called when an observed attribute changes
  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null
  ) {
    // If the 'actionType' attribute value has changed, update it
    if (oldValue !== newValue) {
      switch (name) {
        case 'actionType':
          this.actionType = (newValue as HeroButtonActionTypes) || 'Link'
          break
      }
      // Re-render the element to reflect the changes
      this.render()
    }
  }

  // Renders the button element based on the current attributes and content
  render(): void {
    const actionTypeClass = `action-type-${this.actionType}`
    const label = this.innerHTML || 'Click Me' // Uses innerHTML as the label

    // Sets the inner HTML of the button, including the appropriate CSS class and label
    this.innerHTML = `
        <button class="hero-button ${actionTypeClass}" type="button">
          ${label}
        </button>
      `
  }
}
