export const KEYCODE = {
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN",
  32: "SPACE",
};
export const ROWS = 20;
export const COLS = 10;

export const SELECTORS = {
  mainCanvas: document.getElementById("main-canvas"),
  nextCanvas: document.getElementById("next-canvas"),
  playButton: document.getElementById("playButton"),
  resetButton: document.getElementById("resetButton"),
  score: document.getElementById("score"),
  level: document.getElementById("level"),
  line: document.getElementById("lines"),
};

export const NEXTROWS = 5;
export const NEXTCOLS = 5;
export const LEVEL = {
  0: 800,
  1: 720,
  2: 630,
  3: 550,
  4: 470,
  5: 380,
  6: 300,
  7: 220,
  8: 130,
  9: 100,
  10: 80,
  11: 80,
  12: 80,
  13: 70,
  14: 70,
  15: 70,
  16: 50,
  17: 50,
  18: 50,
  19: 30,
  20: 30,
  // 29+ is 20ms
};
export const POINTS = {
  1: 100,
  2: 300,
  3: 500,
  4: 800,
  SOFT_DROP: 1,
  HARD_DROP: 2,
};
export const LINES_PER_LEVEL = 10;
