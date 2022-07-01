import { playField } from "./playField.js";

const apple = {
  x: 0,
  y: 0,
  randomPlace() {
    this.x = Math.floor(Math.random() * playField.size);
    this.y = Math.floor(Math.random() * playField.size);
  },
};

export { apple };
