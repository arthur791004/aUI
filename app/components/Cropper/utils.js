export const toBoundingValue = (value, min, max) => {
  let current = Math.max(value, min);

  if (!isNaN(max)) {
    current = Math.min(current, max);
  }

  return current;
};

export const toRelativePosition = (position, element) => {
  const { x, y } = position;
  const { left, top, width, height } = element.parentElement.getBoundingClientRect();

  return {
    x: toBoundingValue(x - left, 0, width),
    y: toBoundingValue(y - top, 0, height),
  };
};

