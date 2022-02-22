export const getComplementaryColor = (color = '') => {
  let colorPart = color;
  if (color && color.startsWith('#')) {
    colorPart = color.slice(1);
  }
  const ind = parseInt(colorPart, 16);
  let iter = ((1 << (4 * colorPart.length)) - 1 - ind).toString(16);
  while (iter.length < colorPart.length) {
    iter = '0' + iter;
  }
  return '#' + iter;
};
