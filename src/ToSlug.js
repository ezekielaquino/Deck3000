const ToSlug = (string = '') => {
  return string.split(' ').join('-').toLowerCase();
};

export default ToSlug;