import { snake } from "./snake.js";
import { apple } from "./apple.js"; 
import { playField } from "./playField.js";

const game = {
  paintTheField() {
    const array = playField.creatPlayField();
    let board = '=============\n';
    array.forEach((innerArray, y) => {
      innerArray.forEach((elem, x) => {
        if (x === snake.x && y === snake.y) {
          board += '1 ';
        } else if (x === apple.x && y === apple.y) {
          board += 'A ';
        } else {
          board += '0 ';
        }
      });
      board += '\n';
    });
    board += '=============\n';
    console.log(board);
  },
};

apple.randomPlace();
game.paintTheField();
snake.down();
snake.down();
game.paintTheField();
