class Snake {
  constructor(x, y) {
    this.points = [{ x, y, direction: 'down' }];
  }

  moveUp() {
    this.moveSnake(0, -1, 'up', 'down');
  }

  moveDown() {
    this.moveSnake(0, 1, 'down', 'up');
  }

  moveLeft() {
    this.moveSnake(-1, 0, 'left', 'right');
  }

  moveRight() {
    this.moveSnake(1, 0, 'right', 'left');
  }

  moveSnake(x, y, directionMove, directionBlocked) {
    if (this.points[0].direction === directionBlocked) {
      return;
    }
    this.points.unshift({
      x: this.points[0].x + x,
      y: this.points[0].y + y,
      direction: directionMove,
    });
    this.points.pop();
  }

  eatApple(x, y) {
    if (this.points[0].x === x &&
        this.points[0].y === y) {
      const lastSnakeIndex = this.points.length - 1;

      if (this.points[lastSnakeIndex].direction === 'down') {
        this.points.push({
          x: this.points[lastSnakeIndex].x,
          y: this.points[lastSnakeIndex].y - 1,
          direction: this.points[lastSnakeIndex].direction,
        });
      } else if (this.points[lastSnakeIndex].direction === 'up') {
        this.points.push({
          x: this.points[lastSnakeIndex].x,
          y: this.points[lastSnakeIndex].y + 1,
          direction: this.points[lastSnakeIndex].direction,
        });
      } else if (this.points[lastSnakeIndex].direction === 'left') {
        this.points.push({
          x: this.points[lastSnakeIndex].x + 1,
          y: this.points[lastSnakeIndex].y,
          direction: this.points[lastSnakeIndex].direction,
        });
      } else if (this.points[lastSnakeIndex].direction === 'right') {
        this.points.push({
          x: this.points[lastSnakeIndex].x - 1,
          y: this.points[lastSnakeIndex].y,
          direction: this.points[lastSnakeIndex].direction,
        });
      }

      return true;
    }

    return false;
  }

  collideWithTail() {
    for (let i = 1; i < this.points.length; i++) {
      if (this.points[0].x === this.points[i].x &&
          this.points[0].y === this.points[i].y) {
        return true;
      }
    }

    return false;
  }
}

export { Snake };
