import { PlayField } from './playField.js';

const board = document.querySelector('.board');
const playField = new PlayField(11);

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'ArrowUp') {
    playField.snake.moveUp();
    board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
  }
  if (keyName === 'ArrowDown') {
    playField.snake.moveDown();
    board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
  }
  if (keyName === 'ArrowLeft') {
    playField.snake.moveLeft();
    board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
  }
  if (keyName === 'ArrowRight') {
    playField.snake.moveRight();
    board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
  }
});

board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
