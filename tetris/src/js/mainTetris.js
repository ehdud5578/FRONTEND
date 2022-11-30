/**
 * @param CONSTANTS 상수
 * @param functions 함수들
 */
class mainTetris {
  constructor(CONSTANTS, functions) {
    this.KEYCODE = CONSTANTS.KEYCODE;
    this.functions = functions;
    this.canvas = CONSTANTS.selectors.mainCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.clientWidth;
    this.HEIGHT = this.canvas.clientHeight;
    this.cellSize = 30;
  }

  init() {
    this.drawGridLayout();
  }

  drawGridLayout() {
    this.ctx.lineWidth = 0.3;
    for (let i = 0; i < this.WIDTH / this.cellSize; i++) {
      this.drawLine(this.cellSize * i, 0, this.cellSize * i, this.HEIGHT);
    }
    for (let i = 0; i <= this.HEIGHT / this.cellSize; i++) {
      this.drawLine(0, this.cellSize * i, this.WIDTH, this.cellSize * i);
    }
  }

  drawLine(startLeft, startTop, endLeft, endTop) {
    this.ctx.beginPath();
    this.ctx.moveTo(startLeft, startTop);
    this.ctx.lineTo(endLeft, endTop);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default mainTetris;
