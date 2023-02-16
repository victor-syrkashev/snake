class Snake {
  constructor(x, y) {
    this.points = [{ x, y, direction: '' }];
    this.moveBtnsList = {
      ArrowUp: { move: 'up', donotmove: 'down' },
      ArrowDown: { move: 'down', donotmove: 'up' },
      ArrowRight: { move: 'right', donotmove: 'left' },
      ArrowLeft: { move: 'left', donotmove: 'right' },
    };
  }

  moveSnake(x, y, directionMove) {
    this.points.unshift({
      x: this.points[0].x + x,
      y: this.points[0].y + y,
      direction: directionMove,
    });
    this.points.pop();
  }

  moveUp() {
    this.moveSnake(0, -1, 'up');
  }

  moveDown() {
    this.moveSnake(0, 1, 'down');
  }

  moveLeft() {
    this.moveSnake(-1, 0, 'left');
  }

  moveRight() {
    this.moveSnake(1, 0, 'right');
  }

  changeSnakeDirection(keyName) {
    if (keyName) {
      this.points[0].direction = keyName;
    }
  }

  collideWithApple(x, y) {
    if (this.points[0].x === x && this.points[0].y === y) {
      return true;
    }
    return false;
  }

  eatApple() {
    const lastSnakePoint = this.points[this.points.length - 1];

    if (lastSnakePoint.direction === 'down') {
      this.points.push({
        x: lastSnakePoint.x,
        y: lastSnakePoint.y - 1,
        direction: lastSnakePoint.direction,
      });
    } else if (lastSnakePoint.direction === 'up') {
      this.points.push({
        x: lastSnakePoint.x,
        y: lastSnakePoint.y + 1,
        direction: lastSnakePoint.direction,
      });
    } else if (lastSnakePoint.direction === 'left') {
      this.points.push({
        x: lastSnakePoint.x + 1,
        y: lastSnakePoint.y,
        direction: lastSnakePoint.direction,
      });
    } else if (lastSnakePoint.direction === 'right') {
      this.points.push({
        x: lastSnakePoint.x - 1,
        y: lastSnakePoint.y,
        direction: lastSnakePoint.direction,
      });
    }
  }

  collideWithTail() {
    const head = this.points[0];
    for (let i = 1; i < this.points.length; i++) {
      const bodyChunk = this.points[i];
      const differenceX = head.x - bodyChunk.x;
      const differenceY = head.y - bodyChunk.y;

      if (
        (differenceX === 1 && head.direction === 'left' && differenceY === 0) ||
        (differenceX === -1 &&
          head.direction === 'right' &&
          differenceY === 0) ||
        (differenceY === 1 && head.direction === 'up' && differenceX === 0) ||
        (differenceY === -1 && head.direction === 'down' && differenceX === 0)
      ) {
        return true;
      }
    }

    return false;
  }
}

export { Snake };
