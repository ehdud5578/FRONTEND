import defaultCanvas from "./defaultCanvas.js";
import { POINTS, LINES_PER_LEVEL } from "./constant.js";
const INIT_BOARD = () => ({ value: 0, color: "" });
const EMPTY_ROW = (cols) => {
  const row = [];
  for (let i = 0; i < cols; i++) {
    row.push(INIT_BOARD());
  }
  return row;
};
const SCORE = {
  1: 100,
  2: 200,
  3: 400,
  4: 800,
};
export default class mainTetris extends defaultCanvas {
  constructor(selector) {
    super(selector);
    this.cellSize = this.HEIGHT / window.CONSTANT.ROWS;
    this.ROWS = window.CONSTANT.ROWS;
    this.COLS = window.CONSTANT.COLS;
  }

  init() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.board = new Array(this.ROWS);
    for (let i = 0; i < this.ROWS; i++) {
      this.board[i] = EMPTY_ROW(this.COLS);
    }
    this.piece = null;
  }

  draw() {
    // console.table(this.board);
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.board.forEach((rows, i) => {
      rows.forEach((value, j) => {
        if (value.value !== 0) {
          this.ctx.fillStyle = value.color;
          this.ctx.fillRect(j * this.cellSize, i * this.cellSize, 30, 30);
        }
      });
    });
    this.drawGridLayout();
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
  deleteRow() {
    let cntDeleteRow = 0;
    this.board.forEach((element, y) => {
      if (element.every((item) => item.value > 0)) {
        // 값이 하나라도 0 이있다면 삭제 X
        this.board.splice(y, 1);
        this.board.unshift(EMPTY_ROW(this.COLS));
        cntDeleteRow++;
      }
    });
    if (cntDeleteRow > 0) {
      this.addScore(cntDeleteRow);
      this.accountProxy.lines += cntDeleteRow;
      if (this.accountProxy.lines > LINES_PER_LEVEL) {
        this.accountProxy.level += 1;
        this.accountProxy.lines = 0;
      }
    }
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
    this.deleteRow();
  }

  isGameOver() {
    if (this.piece.y === 0) {
      return true;
    } else {
      false;
    }
  }
  addScore(rows) {
    this.accountProxy.score += (this.accountProxy.level + 1) * POINTS[rows];
  }
  gameOver() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(30, 90, 240, 36);
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.fillText("GAME OVER", 54, 120);
  }
}
