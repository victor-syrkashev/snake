class Snake {
  constructor(x, y) {
    this.point = [{ x, y, direction: 'down' }];
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
    if (this.point[0].direction === directionBlocked) {
      return;
    }
    this.point.unshift({
      x: this.point[0].x + x,
      y: this.point[0].y + y,
      direction: directionMove,
    });
    this.point.pop();
  }

  eatApple(x, y) {
    if (this.point[0].x === x
       && this.point[0].y === y) {
      const lastSnakeIndex = this.point.length - 1;
      if (this.point[lastSnakeIndex].direction === 'down') {
        this.point.push({
          x: this.point[lastSnakeIndex].x,
          y: this.point[lastSnakeIndex].y - 1,
          direction: this.point[lastSnakeIndex].direction,
        });
      } else if (this.point[lastSnakeIndex].direction === 'up') {
        this.point.push({
          x: this.point[lastSnakeIndex].x,
          y: this.point[lastSnakeIndex].y + 1,
          direction: this.point[lastSnakeIndex].direction,
        });
      } else if (this.point[lastSnakeIndex].direction === 'left') {
        this.point.push({
          x: this.point[lastSnakeIndex].x + 1,
          y: this.point[lastSnakeIndex].y,
          direction: this.point[lastSnakeIndex].direction,
        });
      } else if (this.point[lastSnakeIndex].direction === 'right') {
        this.point.push({
          x: this.point[lastSnakeIndex].x - 1,
          y: this.point[lastSnakeIndex].y,
          direction: this.point[lastSnakeIndex].direction,
        });
      }
      return true;
    }
    return false;
  }
}

export { Snake };
