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
  constructor(ctx, tetromino, cellSize) {
    this.ctx = ctx;
    this.initPiece(tetromino);
    this.cellSize = cellSize;
  }

  initPiece({ color, shape }) {
    this.color = color;
    this.shape = shape;

    // 시작위치는 고정
    this.x = 4;
    this.y = 0;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.shape.forEach((row, y) => {
      row.forEach((value, x) => {
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
    this.shape = p.shape;
    this.draw();
  }

  turn() {
    // 행렬을 변환한다. p는 Piece의 인스턴스이다.
    for (let y = 0; y < this.shape.length; ++y) {
      for (let x = 0; x < y; ++x) {
        [this.shape[x][y], this.shape[y][x]] = [
          this.shape[y][x],
          this.shape[x][y],
        ];
      }
    }

    // 열 순서대로 뒤집는다.
    this.shape.forEach((row) => row.reverse());
    return this;
  }
}
