import { PlayField } from './playField.js';

const board = document.querySelector('.board');
const playField = new PlayField(11);

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'ArrowUp') {
    playField.snake.moveUp();
    if (playField.collisionDetection()) {
      board.innerHTML = '<pre>Game Over</pre>';
    } else {
      board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
    }
  }
  if (keyName === 'ArrowDown') {
    playField.snake.moveDown();
    if (playField.collisionDetection()) {
      board.innerHTML = '<pre>Game Over</pre>';
    } else {
      board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
    }
  }
  if (keyName === 'ArrowLeft') {
    playField.snake.moveLeft();
    if (playField.collisionDetection()) {
      board.innerHTML = '<pre>Game Over</pre>';
    } else {
      board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
    }
  }
  if (keyName === 'ArrowRight') {
    playField.snake.moveRight();
    if (playField.collisionDetection()) {
      board.innerHTML = '<pre>Game Over</pre>';
    } else {
      board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
    }
  }
});

board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
