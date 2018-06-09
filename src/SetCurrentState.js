const SetCurrentState = (args) => {
  const {
    state,
    currentKey,
    direction,
    currentIndex,
    length
  } = args;

  if (Number.isInteger(direction)) {
    state[currentKey] = direction;
  } else {
    state.direction = direction;

    switch (direction) {
      case 'next':
        if (currentIndex !== length) state[currentKey] += 1;
        else state[currentKey] = 0;
        break;
      case 'prev':
        if (currentIndex !== 0) state[currentKey] -= 1;
        else state[currentKey] = length;
        break;
    }
  }

  state.next = state[currentKey] === length ? 0 : state[currentKey] + 1;
  state.prev = state[currentKey] === 0 ? length : state[currentKey] - 1;
}

export default SetCurrentState;