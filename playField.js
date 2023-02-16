import { Apple } from './apple.js';
import { Snake } from './snake.js';

class PlayField {
  constructor(size) {
    this.size = size;
    this.matrix = this.createPlayField();
    this.isGameOver = false;
    this.counter = 0;

    this.snake = new Snake(
      Math.floor((this.size - 1) / 2),
      Math.floor((this.size - 1) / 2)
    );

    this.apple = new Apple(
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size)
    );
  }

  addNewApple() {
    this.apple = new Apple(
      Math.floor(Math.random() * this.size),
      Math.floor(Math.random() * this.size)
    );
  }

  createPlayField() {
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

  snakeCollideWithWall() {
    const snake = this.snake.points[0];
    return (
      (snake.x === 0 && snake.direction === 'left') ||
      (snake.x === this.size - 1 && snake.direction === 'right') ||
      (snake.y === 0 && snake.direction === 'up') ||
      (snake.y === this.size - 1 && snake.direction === 'down')
    );
  }

  paintTheField() {
    let board = '';
    this.matrix.forEach((innerArray, y) => {
      innerArray.forEach((_elm, x) => {
        for (let i = 0; i < this.snake.points.length; i++) {
          if (x === this.snake.points[i].x && y === this.snake.points[i].y) {
            board += '<div class="snake"></div> ';
            return;
          }
        }
        if (x === this.apple.x && y === this.apple.y) {
          board += '<div class="apple"></div> ';
        } else {
          board += '<div class="empty-field"></div> ';
        }
      });
      board += '\n';
    });
    return board;
  }

  update() {
    this.isGameOver =
      this.snakeCollideWithWall() || this.snake.collideWithTail();

    if (this.snake.collideWithApple(this.apple.x, this.apple.y)) {
      this.snake.eatApple();
      this.addNewApple();
      this.counter += 1;
    }

    if (this.snake.points[0].direction === 'down') {
      this.snake.moveDown();
    } else if (this.snake.points[0].direction === 'up') {
      this.snake.moveUp();
    } else if (this.snake.points[0].direction === 'left') {
      this.snake.moveLeft();
    } else if (this.snake.points[0].direction === 'right') {
      this.snake.moveRight();
    }
  }

  paint() {
    if (this.isGameOver) {
      this.isGameOver = true;
    }
    return this.paintTheField();
  }
}

export { PlayField };
