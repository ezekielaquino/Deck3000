import ToggleClass from './ToggleClass';

const SetPosition = (instance, state) => {
  let position;

  if (instance.index === state.current) position = 'current';
  else if (instance.index === state.next) position = 'next';
  else if (instance.index === state.prev) position = 'prev';
  else if (instance.index > state.current) position = 'next';
  else if (instance.index < state.current) position = 'prev';

  ToggleClass({
    target: instance.element,
    targetClass: instance.className,
    initialClasses: instance.initialClasses,
    classNames: [`is-${position}`],
    direction: state.direction,
    reset: state.reset,
  });
};

export default SetPosition;