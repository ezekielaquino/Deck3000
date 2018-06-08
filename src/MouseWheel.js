/**
* Taken from Alvaro Trigo's Fullpage.js
* with a few modi
*/
const MouseWheel = (e, instance) => {
  instance.currentTime = new Date().getTime();

  e = window.event || e || e.originalEvent;

  const value = e.wheelData || -e.deltaY || -e.detail;
  const delta = Math.max(-1, Math.min(1, value));

  if (instance.scrolls.length >= 150) {
    instance.scrolls.shift();
  }

  instance.scrolls.push(Math.abs(value));

  const timeDiff = instance.currentTime - instance.prevTime;
  instance.prevTime = instance.currentTime;

  if (timeDiff > 50) instance.scrolls = [];

  const _getAverage = length => {
    const n = Math.max(instance.scrolls.length - length, 1);
    const array = instance.scrolls.slice(n);

    return array.reduce((p, c) => p + c, 0 ) / length;
  }

  if (!instance.state.isAnimating) {
    const avEnd = _getAverage(10);
    const avMid = _getAverage(70);
    const isAccelerating = avEnd >= avMid;

    if (isAccelerating && timeDiff >= 50) {
      if (delta < 0) {
        instance.navigate('section', 'next');
      }
      else instance.navigate('section', 'prev');
    }
  }
};

export default MouseWheel;