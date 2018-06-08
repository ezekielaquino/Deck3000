const ToggleClass = (args) => {
  const {
    target,
    targetClass,
    initialClasses,
    classNames,
    direction,
    reset,
  } = args;
  const isInstant = direction === 'next' ? 'is-next' :'is-prev';

  target.classList.add(...classNames);

  const classes = Array.from(target.classList).filter(c => {
    if (c === targetClass || classNames.includes(c) || initialClasses.includes(c)) return c;
  });

  if (classNames.includes(isInstant) || reset) classes.push('is-instant');

  return target.classList = classes.join(' ');
};

export default ToggleClass;