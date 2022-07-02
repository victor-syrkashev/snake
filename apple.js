// 1. Prototype inheritance
// const apple = function apple(x, y) {
//   this.x = x;
//   this.y = y;
// };

// apple.prototype.setRandomPosition = function setRandomPosition() {
//   this.x = Math.floor(Math.random() * playField.size);
//   this.y = Math.floor(Math.random() * playField.size);
// };

// apple.prototype.setXTo100 = function setXTo100() {
//   this.x = 100;
// };

// 2. Class
class Apple {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// const apple = {
//   x: 0,
//   y: 0,
//   setRandomPosition() {
//     this.x = Math.floor(Math.random() * playField.size);
//     this.y = Math.floor(Math.random() * playField.size);
//   }
// };

export { Apple };
