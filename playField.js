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
  }

  paintTheField() {
    if (this.snake.point[0].x === this.apple.x && this.snake.point[0].y === this.apple.y) {
      const lastSnakeIndex = this.snake.point.length - 1;
      if (this.snake.point[lastSnakeIndex].direction === 'down') {
        this.snake.point.push({
          x: this.snake.point[lastSnakeIndex].x,
          y: this.snake.point[lastSnakeIndex].y - 1,
          direction: this.snake.point[lastSnakeIndex].direction,
        });
      } else if (this.snake.point[lastSnakeIndex].direction === 'up') {
        this.snake.point.push({
          x: this.snake.point[lastSnakeIndex].x,
          y: this.snake.point[lastSnakeIndex].y + 1,
          direction: this.snake.point[lastSnakeIndex].direction,
        });
      } else if (this.snake.point[lastSnakeIndex].direction === 'left') {
        this.snake.point.push({
          x: this.snake.point[lastSnakeIndex].x + 1,
          y: this.snake.point[lastSnakeIndex].y,
          direction: this.snake.point[lastSnakeIndex].direction,
        });
      } else if (this.snake.point[lastSnakeIndex].direction === 'right') {
        this.snake.point.push({
          x: this.snake.point[lastSnakeIndex].x - 1,
          y: this.snake.point[lastSnakeIndex].y,
          direction: this.snake.point[lastSnakeIndex].direction,
        });
      }
      this.apple = new Apple(
        Math.floor(Math.random() * this.size),
        Math.floor(Math.random() * this.size)
      );
    }
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
