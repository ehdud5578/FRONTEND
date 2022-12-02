export default class defaultCanvas {
  constructor(selector) {
    this.canvas = selector;
    this.ctx = this.canvas.getContext("2d");
    this.WIDTH = this.canvas.clientWidth;
    this.HEIGHT = this.canvas.clientHeight;
    this.F = window.F;
  }

  drawGridLayout() {
    this.ctx.lineWidth = 0.3;
    for (const i of this.F.range(this.COLS + 1)) {
      this.drawLine(this.cellSize * i, 0, this.cellSize * i, this.HEIGHT);
    }
    for (const i of this.F.range(this.ROWS + 1)) {
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
