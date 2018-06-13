const MouseWheel = (e, instance) => {
  e.preventDefault();

  instance.currentTime = new Date().getTime();

  const timeDiff = instance.currentTime - (instance.prevTime || 0);
  const directionY = Math.sign(e.deltaY) > 0 ? 'next' : 'prev';
  const directionX = Math.sign(e.deltaX) > 0 ? 'next' : 'prev';

  instance.prevTime = instance.currentTime;

  if (!instance.state.isAnimating && timeDiff > 80) {
    const isY = Math.abs(e.deltaY) && Math.abs(e.deltaX) <= 1;
    const isX = Math.abs(e.deltaX) && Math.abs(e.deltaY) <= 1;

    if (isY) return instance.navigate('section', directionY);
    if (isX) return instance.navigate('slide', directionX);
  }
};

export default MouseWheel;