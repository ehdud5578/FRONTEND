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

    // console.table(this.board);
  }

  valid(piece) {
    return piece.shape.every((element, i) => {
      return element.every((item, j) => {
        const nextY = piece.y + i;
        const nextX = piece.x + j;
        return this.isEmpty(item) || this.isArrange(nextY, nextX);
      });
    });
  }

  isArrange(y, x) {
    if (x >= 0 && x < this.COLS && y >= 0 && y < this.ROWS) {
      return true;
    }
  }
  isEmpty(item) {
    return item <= 0;
  }
}
