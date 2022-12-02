import defaultCanvas from "./defaultCanvas.js";

export default class mainTetris extends defaultCanvas {
  constructor(selector) {
    super(selector);
    this.cellSize = this.HEIGHT / window.CONSTANT.ROWS;
    this.ROWS = window.CONSTANT.ROWS;
    this.COLS = window.CONSTANT.COLS;
    this.board = Array(this.ROWS)
      .fill()
      .map(() => Array(this.COLS).fill(0));
  }

  init() {
    this.drawGridLayout();
    console.table(this.board);
  }

  valid(shape, location) {
    shape.every((element, i) => {
      element.every((item, j) => {
        debugger;
        if (item > 0) {
          const nextY = location.y + i;
          const nextX = location.x + j;
          if (!this.isArrange(nextY, nextX)) {
            debugger;
            return false;
          }
        }
      });
    });
    return true;
  }

  isArrange(y, x) {
    if (x >= 0 && x < this.COLS && y >= 0 && y < this.ROWS) {
      return true;
    }
  }
}
