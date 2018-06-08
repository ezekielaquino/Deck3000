import Emitter from './Emitter';
import Slide from './Slide';
import SetPosition from './SetPosition';

class Section {
  constructor(options = {}) {
    Object.assign(this, options);
    this.className = `${this.slideshow.baseSelector}__section`;

    this.state = {
      currentSlide: 0,
    };

    this.init();
  }

  init() {
    this.initialClasses = Array.from(this.element.classList);
    this.element.classList.add(this.className);

    this._initSlides();

    this.state.next = this.slides.length && 1;
    this.state.prev = this.slides.length && this.slides.length - 1;

    Emitter.on('navigate', e => this._onNavigate(e));
  }

  getCurrentSlide() {
    return this.slides[this.state.currentSlide].element;
  }

  _initSlides() {
    const children = Array.from(this.element.querySelectorAll(this.slideSelector)) || this.element.children;

    if (children.length === 2) {
      const clone = children[0].cloneNode(true);
      this.element.appendChild(clone);
      children.push(clone);
    }

    this.state.slideLength = children.length - 1;

    const slides = Array.from(children).map((element, index) => {
      return new Slide({
        parentSection: this,
        element,
        index,
      });
    });

    this.slides = slides;
  }

  _onNavigate(e) {
    SetPosition(this, e);
  }
}

export default Section;