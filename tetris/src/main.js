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
  LEFT: (x, y) => ({ x: x - 1, y }),
  RIGHT: (x, y) => ({ x: x + 1, y }),
  DOWN: (x, y) => ({ x, y: y + 1 }),
};
window.F = functions;
window.KEYCODE = KEYCODE;

const game = new mainTetris(SELECTORS.mainCanvas);
const piece = new Piece(game.ctx, "type", game.cellSize);
piece.draw();
game.piece = piece;
document.addEventListener("keydown", (event) => {
  let piece = game.piece;
  const movement = moves[KEYCODE[event.keyCode]];
  const nextLocation = movement(piece.x, piece.y);
  if (game.valid(piece.shape, nextLocation)) {
    game.ctx.clearRect(0, 0, game.WIDTH, game.HEIGHT);
    piece.move(nextLocation);
    game.drawGridLayout();
  }
});
const next = new nextTetris(SELECTORS.nextCanvas);

game.init();
next.init();
