import Emitter from './Emitter';
import SetPosition from './SetPosition';

class Slide {
  constructor(options = {}) {
    Object.assign(this, options);
    this.sectionIndex = options.parentSection.index;
    this.className = `${this.parentSection.className}-slide`;
    this.init();
  }

  init() {
    this.initialClasses = Array.from(this.element.classList);
    this.element.classList.add(this.className);

    if (this.parentSection.state.slideLength === 0) {
      return this.element.classList.add('is-current');
    }

    Emitter.on('navigateSlide', e => this._onNavigate(e));
  }

  _onNavigate(e) {
    const { current, direction, reset } = e;
    const { currentSlide, next, prev } = this.parentSection.state;

    if (this.sectionIndex === current || !direction) {
      SetPosition(this, {
        current: currentSlide,
        direction,
        next,
        prev,
        reset,
      });
    }
  }
}

export default Slide;