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
}
