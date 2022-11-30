export const functions = {};

functions.range = function* (n) {
  let i = -1;
  while (++i < n) {
    yield i;
  }
};
