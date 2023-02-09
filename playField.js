import { Apple } from './apple.js';
import { Snake } from './snake.js';

class PlayField {
  constructor(size) {
    this.size = size;
    this.matrix = this.creatPlayField();
    this.isGameOver = false;

    this.snake = new Snake(
      Math.floor((this.size - 1) / 2),
      Math.floor((this.size - 1) / 2),
    );

    // TODO: move to addNewApple()
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

  snakeCollideWithWall() {
    return this.snake.points[0].x < 0 ||
        this.snake.points[0].x === this.size ||
        this.snake.points[0].y < 0 ||
        this.snake.points[0].y === this.size;
  }

  // TODO: move to snake.js
  changeSnakeDirection(keyName) {
    if (keyName === 'ArrowUp') {
      if (this.snake.points[0].direction !== 'down') {
        this.snake.points[0].direction = 'up';
      }
    }

    if (keyName === 'ArrowDown') {
      if (this.snake.points[0].direction !== 'up') {
        this.snake.points[0].direction = 'down';
      }
    }

    if (keyName === 'ArrowLeft') {
      if (this.snake.points[0].direction !== 'right') {
        this.snake.points[0].direction = 'left';
      }
    }

    if (keyName === 'ArrowRight') {
      if (this.snake.points[0].direction !== 'left') {
        this.snake.points[0].direction = 'right';
      }
    }
  }

  paintTheField() {
    let board = '=====================\n';
    this.matrix.forEach((innerArray, y) => {
      innerArray.forEach((_elm, x) => {
        for (let i = 0; i < this.snake.points.length; i++) {
          if (x === this.snake.points[i].x && y === this.snake.points[i].y) {
            board += '<span style="color: OrangeRed">1</span> ';
            return;
          }
        }
        if (x === this.apple.x && y === this.apple.y) {
          board += '<span style="color: LimeGreen">A</span> ';
        } else {
          board += '0 ';
        }
      });
      board += '\n';
    });
    board += '=====================\n';
    return board;
  }

  update() {
    this.isGameOver = this.snakeCollideWithWall() || this.snake.collideWithTail();

    if (this.isGameOver) {
      return;
    }

    if (this.snake.collideWithApple(this.apple.x, this.apple.y)) {
      this.snake.eatApple(this.apple.x, this.apple.y);
      this.addNewApple();
    }

    // if (this.snake.eatApple(this.apple.x, this.apple.y)) {
    //   this.apple = new Apple(
    //     Math.floor(Math.random() * this.size),
    //     Math.floor(Math.random() * this.size)
    //   );
    // }

    this.snake.update();

    // if (this.snake.points[0].direction === 'down') {
    //   this.snake.moveDown();
    // } else if (this.snake.points[0].direction === 'up') {
    //   this.snake.moveUp();
    // } else if (this.snake.points[0].direction === 'left') {
    //   this.snake.moveLeft();
    // } else if (this.snake.points[0].direction === 'right') {
    //   this.snake.moveRight();
    // }
  }

  paint() {
    if (this.isGameOver) {
      return 'Game Over';
    } else {
      return this.paintTheField();
    }
  }
}

export { PlayField };
