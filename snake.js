class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.direction = 'down';
  }

  moveUp() {
    if (this.direction === 'down') {
      console.log("snake can't turn around");
      return;
    }
    this.y -= 1;
    this.direction = 'up';
  }

  moveDown() {
    if (this.direction === 'up') {
      console.log("snake can't turn around");
      return;
    }
    this.y += 1;
    this.direction = 'down';
  }

  moveLeft() {
    if (this.direction === 'right') {
      console.log("snake can't turn around");
      return;
    }
    this.x -= 1;
    this.direction = 'left';
  }

  moveRight() {
    if (this.direction === 'left') {
      console.log("snake can't turn around");
      return;
    }
    this.x += 1;
    this.direction = 'right';
  }
}

export { Snake };
