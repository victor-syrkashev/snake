import { Apple } from './apple.js';
import { Snake } from './snake.js';

class PlayField {
  constructor(size) {
    this.size = size;
    this.matrix = this.creatPlayField();
    this.snake = new Snake(
      Math.floor((this.size - 1) / 2),
      Math.floor((this.size - 1) / 2),
      this.size,
    );
    // this.snake = new Snake([4, 5], [3, 3]);
    this.apple = new Apple(
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size)
    );
  }

  creatPlayField() {
    // TODO: meaningful names
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

  paintTheField() {
    if (this.snake.x < 0 || this.snake.x === this.size
      || this.snake.y < 0 || this.snake.y === this.size) {
      console.log('Game over...snake hit the wall');
      return 'Game over';
    }

    if (this.snake.x === this.apple.x && this.snake.y === this.apple.y) {
      this.apple = new Apple(
        Math.floor(Math.random() * this.size),
        Math.floor(Math.random() * this.size)
      );
    }
    let board = '=====================\n';
    this.matrix.forEach((innerArray, y) => {
      innerArray.forEach((_elm, x) => {
        if (x === this.snake.x && y === this.snake.y) {
          board += '1 ';
        } else if (x === this.apple.x && y === this.apple.y) {
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
