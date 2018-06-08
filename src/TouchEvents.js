const TouchEvents = instance => {
  const isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0) || (navigator.maxTouchPoints));
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (isTouch) {
    instance.element.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }, false);

    instance.element.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;

      const diffX = Math.abs(touchEndX - touchStartX) >= 100;
      const diffY = Math.abs(touchEndY - touchStartY) >= 100;

      if (touchEndX <= touchStartX && diffX) {
        // left
        return instance.navigate('slide', 'next');
      }
      if (touchEndX >= touchStartX && diffX) {
        // right
        return instance.navigate('slide', 'prev');
      }
      if (touchEndY >= touchStartY && diffY) {
        // down
        return instance.navigate('section', 'prev');
      }
      if (touchEndY <= touchStartY && diffY) {
        // up
        return instance.navigate('section', 'next');
      }
    }, false);
  }
}

export default TouchEvents;