import { Apple } from './apple.js';
import { Snake } from './snake.js';

class PlayField {
  constructor(size) {
    this.size = size;
    this.matrix = this.creatPlayField();
    this.snake = new Snake(
      Math.floor((this.size - 1) / 2),
      Math.floor((this.size - 1) / 2),
    );
    this.apple = new Apple(
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size)
    );
  }

  creatPlayField() {
    const array = [];
    const innerArray = [];
    for (let i = 0; i < this.size; i++) {
      innerArray.push(i);
    }
    for (let j = 0; j < this.size; j++) {
      array.push(innerArray);
    }
    return array;
  }

  // TODO: create game loop

  collisionDetection() {
    if (this.snake.point[0].x < 0 || this.snake.point[0].x === this.size
      || this.snake.point[0].y < 0 || this.snake.point[0].y === this.size) {
      return true;
    }
    for (let i = 1; i < this.snake.point.length; i++) {
      if (this.snake.point[0].x === this.snake.point[i].x
        && this.snake.point[0].y === this.snake.point[i].y) {
        return true;
      }
    }
  }

  paintTheField() {
    let board = '=====================\n';
    this.matrix.forEach((innerArray, y) => {
      innerArray.forEach((_elm, x) => {
        for (let i = 0; i < this.snake.point.length; i++) {
          if (x === this.snake.point[i].x && y === this.snake.point[i].y) {
            board += '1 ';
            return;
          }
        }
        if (x === this.apple.x && y === this.apple.y) {
          board += 'A ';
        } else {
          board += '0 ';
        }
      });
      board += '\n';
    });
    board += '=====================\n';
    return board;
  }
}

export { PlayField };
