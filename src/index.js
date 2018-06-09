import Emitter from './Emitter';
import Section from './Section';
import SetCurrentState from './SetCurrentState';
import MouseWheel from './MouseWheel';
import TouchEvents from './TouchEvents';
import ToSlug from './ToSlug';
import SetBrowserHistory from './SetBrowserHistory';

class Deck3000 {
  constructor(options) {
    Object.assign(this, options);
    this.baseSelector = 'js-deck3000';
    this.element = document.querySelector(`.${this.baseSelector}`);
    this.emitter = Emitter;
    this.state = {
      current: 0,
      next: 1,
    };

    this.init();
  }

  init() {
    const { current } = this.state;
    const sections = Array.from(this.element.children).map((element, index, array) => {
      const path = window.location.pathname.split('/')[1];

      this.state.sectionLength = this.state.prev = array.length - 1;

      if (this.updateURL && path) {
        if (path === ToSlug(element.dataset.title) || path === index.toString()) {
          SetCurrentState({
            state: this.state,
            currentKey: 'current',
            currentIndex: index,
            length: this.state.sectionLength,
            direction: index,
          });
        }
      }

      return new Section({
        slideshow: this,
        slideSelector: this.slideSelector,
        element,
        index,
      });
    });

    this.sections = sections;

    Emitter.emit('navigate', this.state);
    Emitter.emit('navigateSlide', { current });

    setTimeout(() => {
      this.element.classList.add('is-init');
      this._attachEventHandlers();
      this.transitionDuration = parseFloat(getComputedStyle(this.sections[0].element)['transitionDuration']) * 1000;
    }, 0);
  }

  _attachEventHandlers() {
    this.scrolls = [];
    this.prevTime = new Date().getTime();

    this.element.addEventListener('mousewheel', e => {MouseWheel(e, this) });
    this.element.addEventListener('DOMMouseScroll', e => { MouseWheel(e, this) });

    TouchEvents(this);

    if (this.keyboardEvents) {
      window.addEventListener('keyup', e => {
        if (this.state.isAnimating) return;

        switch (e.keyCode) {
          case 38: // up
            this.navigate('section', 'prev');
            break;
          case 40: // down
            this.navigate('section', 'next');
            break;
          case 37: // left
            this.navigate('slide', 'prev');
            break;
          case 39: // right
            this.navigate('slide', 'next');
            break;
        }
      });
    }
  }

  disableEvents(bool) {
    this.noEvents = bool;
  }

  navigate(type, direction, withCallback = true, reset) {
    if (this.noEvents || this.state.isAnimating) return;

    const { current, sectionLength } = this.state;
    const currentSection = this.sections[current];
    const currentSlide = currentSection.slides[currentSection.currentSlide];
    const isSection = type === 'section';
    this.state.direction = direction;

    if (type === 'section') {
      SetCurrentState({
        state: this.state,
        currentKey: 'current',
        currentIndex: current,
        length: sectionLength,
        direction,
      });

      Emitter.emit('navigate', this.state);
    }

    if (type === 'slide') {
      if (currentSection.state.slideLength === 0) return;

      const { currentSlide, slideLength } = currentSection.state;

      SetCurrentState({
        state: currentSection.state,
        currentKey: 'currentSlide',
        currentIndex: currentSlide,
        length: slideLength,
        direction,
      });

      Emitter.emit('navigateSlide', {
        current,
        direction,
        reset,
      });
    }

    if (this.resetSlides && isSection) {
      this.navigate('slide', 0, false, true);
    }

    if (withCallback) this.callback(type);
  }

  callback(type) {
    const currentSection = this.sections[this.state.current];
    const sectionTitle = currentSection.element.dataset.title;
    const state = {
      section: this.state,
      slide: currentSection.state,
      currentSectionElem: currentSection.element,
      currentSlideElem: currentSection.getCurrentSlide(),
    };
    const isSection = type === 'section';
    const onStart = isSection ? this.onSectionStart : this.onSlideStart;
    const onEnd = isSection ? this.onSectionEnd : this.onSlideEnd;

    this.state.isAnimating = true;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.state.isAnimating = false;

      if (this.updateURL) SetBrowserHistory(this.state, sectionTitle);
    }, this.transitionDuration);

    if (onStart) onStart(state);
    if (onEnd) onEnd(state);
  }
}

export default Deck3000;