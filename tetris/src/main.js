import { functions } from "./js/functions.js";
import mainTetris from "./js/mainTetris.js";
import Piece from "./js/piece.js";
import { SELECTORS, KEYCODE, ROWS, COLS, NEXTROWS } from "./js/constant.js";
import nextTetris from "./js/nextCanvas.js";
import { tetrominoType } from "./js/tetromino.js";

window.CONSTANT = {
  KEYCODE,
  ROWS,
  COLS,
  NEXTROWS,
};
window.F = functions;
window.KEYCODE = KEYCODE;

const game = new mainTetris(SELECTORS.mainCanvas);
const next = new nextTetris(SELECTORS.nextCanvas);
const play = SELECTORS.playButton;
const reset = SELECTORS.resetButton;
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

let nextPieceNumber = Math.floor(Math.random() * 7);
let timer;
let account = {
  score: 0,
  lines: 0,
  level: 0,
};
// score, level, line 갱신
function updateAccount(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let accountProxy = new Proxy(account, {
  set: (target, key, value) => {
    target[key] = value;
    updateAccount(key, value);
    return true;
  },
});
game.accountProxy = accountProxy;

reset.addEventListener("click", (e) => {
  reset.blur();
  account.score = 0;
  account.lines = 0;
  account.level = 0;
  clearInterval(timer);
  game.init();
});

play.addEventListener("click", (e) => {
  play.blur(); // play button 을 클릭했을 때 focus 남는것 제거 후 이벤트 동작.
  game.init();
  createNewPiece();
});

function onGround() {
  game.onGround();
  if (game.isGameOver()) {
    game.gameOver();
    clearInterval(timer);
  } else {
    createNewPiece();
  }
}
function getNextPieceNum() {
  nextPieceNumber = Math.floor(Math.random() * 7);
  next.piece = new Piece(
    next.ctx,
    tetrominoType[nextPieceNumber],
    next.cellSize
  );
  next.draw();
}
function getRandomPiece() {
  const randomNumber = nextPieceNumber;
  getNextPieceNum();
  return new Piece(game.ctx, tetrominoType[randomNumber], game.cellSize);
}
// const downEvent = new KeyboardEvent("keydown", { keyCode: "40" });
function createNewPiece() {
  game.piece = getRandomPiece();
  clearInterval(timer);
  timer = setInterval(() => {
    document.dispatchEvent(new KeyboardEvent("keydown", { keyCode: "40" }));
  }, 1000);
  game.draw();
}

document.addEventListener("keydown", (event) => {
  let piece = _.cloneDeep(game.piece);
  const movement = moves[KEYCODE[event.keyCode]];
  let isGameOver;
  if (movement === "dropDown") {
    let nextLocation = _.cloneDeep(piece);
    while (game.valid(nextLocation)) {
      piece.x = nextLocation.x;
      piece.y = nextLocation.y;
      nextLocation = moves.DOWN(nextLocation);
    }
    game.move(piece);
    isGameOver = onGround();
  } else {
    const nextLocation = movement(piece);
    if (game.valid(nextLocation)) {
      game.move(nextLocation);
    } else {
      if (movement.name === "DOWN") {
        isGameOver = onGround();
      }
    }
  }
  if (isGameOver) {
    game.gameOver();
    clearInterval(timer);
  }
});
