import { functions } from "./js/functions.js";
import mainTetris from "./js/mainTetris.js";
import { CONSTANTS } from "./js/constant.js";

const game = new mainTetris(CONSTANTS, functions);
game.init();
