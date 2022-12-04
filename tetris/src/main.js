import { functions } from "./js/functions.js";
import mainTetris from "./js/mainTetris.js";
import Piece from "./js/piece.js";
import { SELECTORS, KEYCODE, ROWS, COLS, NEXTROWS } from "./js/constant.js";
import nextTetris from "./js/nextCanvas.js";
window.CONSTANT = {
  KEYCODE,
  ROWS,
  COLS,
  NEXTROWS,
};
const moves = {
  LEFT: (piece) => {
    piece.x -= 1;
    return piece;
  },
  RIGHT: (piece) => {
    piece.x += 1;
    return piece;
  },
  DOWN: (piece) => {
    piece.y += 1;
    return piece;
  },
  UP: (piece) => piece.turn(),
  SPACE: "dropDown",
};
window.F = functions;
window.KEYCODE = KEYCODE;

const game = new mainTetris(SELECTORS.mainCanvas);
const piece = new Piece(game.ctx, "type", game.cellSize);
piece.draw();
game.piece = piece;
document.addEventListener("keydown", (event) => {
  let piece = _.cloneDeep(game.piece);
  const movement = moves[KEYCODE[event.keyCode]];
  if (movement === "dropDown") {
    let nextLocation = _.cloneDeep(game.piece);
    while (game.valid(nextLocation)) {
      piece.x = nextLocation.x;
      piece.y = nextLocation.y;
      nextLocation = moves.DOWN(nextLocation);
    }
    game.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT);
    game.piece.move(piece);
    game.drawGridLayout();
  } else {
    const nextLocation = movement(piece);
    if (game.valid(nextLocation)) {
      game.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT);
      game.piece.move(nextLocation);
      game.drawGridLayout();
    }
  }
});
const next = new nextTetris(SELECTORS.nextCanvas);

game.init();
next.init();
