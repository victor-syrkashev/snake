import { playField } from "./playField.js";

const snake = {
  x: (playField.size - 1) / 2,
  y: (playField.size - 1) / 2,
  up() {
    this.y -= 1;
  },
  down() {
    this.y += 1;
  },
  left() {
    this.x -= 1;
  },
  right() {
    this.x += 1;
  },
};

export { snake };
