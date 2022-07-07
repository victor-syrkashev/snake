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
}

export { Snake };
