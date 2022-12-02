export default class Piece {
  x;
  y;
  color;
  shape;
  ctx;

  /**
   * @param ctx context
   * @param type tetromino type
   * @param cellSize cellSize
   */
  constructor(ctx, type, cellSize) {
    this.ctx = ctx;
    this.spawn();
    this.cellSize = cellSize;
  }

  spawn() {
    this.color = "blue";
    this.shape = [
      [2, 0, 0],
      [2, 2, 2],
      [0, 0, 0],
    ];

    // Starting position.
    this.x = 4;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        // this.x, this.y는 shape의 상단 왼쪽 좌표이다
        // shape 안에 있는 블록 좌표에 x, y를 더한다.
        // 보드에서 블록의 좌표는 this.x + x가 된다.
        if (value > 0) {
          this.ctx.fillRect(
            this.x * this.cellSize + x * this.cellSize,
            this.y * this.cellSize + y * this.cellSize,
            30,
            30
          );
        }
      });
    });
  }
  /**
   * @param x x
   * @param y y
   */
  move(p) {
    this.x = p.x;
    this.y = p.y;
    this.draw();
    console.log(this.x, this.y);
  }
}
