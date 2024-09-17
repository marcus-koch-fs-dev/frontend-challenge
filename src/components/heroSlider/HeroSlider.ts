import './heroSlider.scss'
import { Products } from '../../mock/heroSliderMockData'

export default class HeroSlider extends HTMLElement {
  products: Products = []
  activeSliderNo: number = 0

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
    this.activeSliderNo
  }

  render() {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `<h1 class='hero-slider__title'>Hello World</h1>`
  }
}
