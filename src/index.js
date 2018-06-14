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
    this._onTransitionEnd = this._onTransitionEnd.bind(this);
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
      this.transitionDuration = parseFloat(getComputedStyle(this.sections[0].element)['transitionDuration']) * 1000;
      this._attachEventHandlers();
    }, 0);
  }

  _attachEventHandlers() {
    this.scrolls = [];
    this.prevTime = new Date().getTime();

    this.element.addEventListener('mousewheel', e => { MouseWheel(e, this) });
    this.element.addEventListener('DOMMouseScroll', e => { MouseWheel(e, this) });

    TouchEvents(this);

    if (this.keyboardEvents) {
      window.addEventListener('keyup', e => {
        if (this.noEvents || this.state.isAnimating) return;

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

  navigate(type, direction, reset, resetDirection) {
    if (this.noEvents || this.state.isAnimating) return;

    const { current, prev, next, sectionLength } = this.state;
    const currentSection = this.sections[current];
    const currentSlide = currentSection.slides[currentSection.state.currentSlide];
    const isSection = type === 'section';
    const element = isSection ? currentSection.element : currentSlide.element;
    const callbackState = {
      section: this.state,
      slide: currentSection.state,
      currentSectionElem: currentSection.element,
      currentSlideElem: currentSection.getCurrentSlide(),
    };
    const onStart = isSection ? this.onSectionStart : this.onSlideStart;
    const onEnd = isSection ? this.onSectionEnd : this.onSlideEnd;

    this.state.isAnimating = !reset;
    this.state.direction = direction;

    if (onStart) onStart(callbackState);

    if (isSection) {
      SetCurrentState({
        state: this.state,
        currentKey: 'current',
        currentIndex: current,
        length: sectionLength,
        direction,
      });

      if (this.updateURL && !reset) {
        SetBrowserHistory(this.state, this.sections[this.state.current].element.dataset.title);
      }

      Emitter.emit('navigate', this.state);
    } else {
      let section = currentSection;
      const { currentSlide, slideLength } = section.state;

      if (reset) section = this._getNextSection(resetDirection);

      SetCurrentState({
        state: section.state,
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

    if (!reset) {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        this._onTransitionEnd({
          element,
          onEnd,
          callbackState,
          isSection,
          direction,
        });
      }, reset ? 0 : this.transitionDuration);
    }
  }

  _getNextSection(direction) {
    const { next, prev } = this.state;
    return direction === 'next' ? this.sections[prev] : this.sections[next];
  }

  _onTransitionEnd(args) {
    const { element, onEnd, callbackState, isSection, direction } = args;

    this.state.isAnimating = false;

    if (isSection && this.resetSlides) this.navigate('slide', 0, true, direction);
    if (onEnd) args.onEnd(callbackState);
  }
}

export default Deck3000;