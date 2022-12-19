import defaultCanvas from "./defaultCanvas.js";

export default class nextTetris extends defaultCanvas {
  constructor(selector) {
    super(selector);
    this.cellSize = this.HEIGHT / window.CONSTANT.NEXTROWS;
    this.ROWS = window.CONSTANT.NEXTROWS;
    this.COLS = window.CONSTANT.NEXTROWS;
  }

  init() {
    this.drawGridLayout();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawGridLayout();
    this.piece.x = 1;
    this.piece.y = 1;
    this.piece.draw();
  }
}
