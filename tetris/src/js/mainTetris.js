import defaultCanvas from "./defaultCanvas.js";

const INIT_BOARD = () => ({ value: 0, color: "" });
export default class mainTetris extends defaultCanvas {
  constructor(selector) {
    super(selector);
    this.cellSize = this.HEIGHT / window.CONSTANT.ROWS;
    this.ROWS = window.CONSTANT.ROWS;
    this.COLS = window.CONSTANT.COLS;
    this.board = new Array(this.ROWS);
    for (let i = 0; i < this.ROWS; i++) {
      this.board[i] = new Array(this.COLS);
      for (let j = 0; j < this.COLS; j++) {
        this.board[i][j] = INIT_BOARD();
      }
    }
  }

  init() {
    this.drawGridLayout();

    // console.table(this.board);
  }
  draw() {
    console.table(this.board);
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.drawGridLayout();
    this.board.forEach((rows, i) => {
      rows.forEach((value, j) => {
        if (value.value !== 0) {
          this.ctx.fillStyle = value.color;
          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, 30, 30);
        }
      });
    });
    this.piece.draw();
  }

  move(nextLocationPiece) {
    this.piece.shape = nextLocationPiece.shape;
    this.piece.x = nextLocationPiece.x;
    this.piece.y = nextLocationPiece.y;
    this.draw();
  }
  valid(piece) {
    return piece.shape.every((element, i) => {
      return element.every((item, j) => {
        const nextY = piece.y + i;
        const nextX = piece.x + j;
        return (
          this.isEmpty(item) ||
          (this.isArrange(nextY, nextX) && this.canMoveDown(nextY, nextX))
        );
      });
    });
  }

  canMoveDown(nextY, nextX) {
    return this.board[nextY][nextX].value === 0;
  }

  isArrange(y, x) {
    if (x >= 0 && x < this.COLS && y >= 0 && y < this.ROWS) {
      return true;
    }
  }
  isEmpty(item) {
    return item <= 0;
  }

  onGround() {
    const locationX = this.piece.x;
    const locationY = this.piece.y;
    this.piece.shape.forEach((element, i) => {
      element.forEach((item, j) => {
        if (item !== 0) {
          this.board[locationY + i][locationX + j].value = 1;
          this.board[locationY + i][locationX + j].color = this.piece.color;
        }
      });
    });
  }
}
