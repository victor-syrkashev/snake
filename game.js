import { PlayField } from './playField.js';
import { Apple } from './apple.js';

const board = document.querySelector('.board');
const playField = new PlayField(17);

function checkAndPaint() {
  if (playField.collisionDetection()) {
    cancelAnimationFrame(requestId);
    board.innerHTML = '<pre>Game Over</pre>';
  } else {
    if (playField.snake.eatApple(playField.apple.x, playField.apple.y)) {
      playField.apple = new Apple(
        Math.floor(Math.random() * playField.size),
        Math.floor(Math.random() * playField.size)
      );
    }
    board.innerHTML = `<pre>${playField.paintTheField()}</pre>`;
  }
}

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === 'ArrowUp') {
    if (playField.snake.point[0].direction !== 'down') {
      playField.snake.point[0].direction = 'up';
    }
  }
  if (keyName === 'ArrowDown') {
    if (playField.snake.point[0].direction !== 'up') {
      playField.snake.point[0].direction = 'down';
    }
  }
  if (keyName === 'ArrowLeft') {
    if (playField.snake.point[0].direction !== 'right') {
      playField.snake.point[0].direction = 'left';
    }
  }
  if (keyName === 'ArrowRight') {
    if (playField.snake.point[0].direction !== 'left') {
      playField.snake.point[0].direction = 'right';
    }
  }
});

let requestId;

function step() {
  if (playField.snake.point[0].direction === 'down') {
    playField.snake.moveDown();
  } else if (playField.snake.point[0].direction === 'up') {
    playField.snake.moveUp();
  } else if (playField.snake.point[0].direction === 'left') {
    playField.snake.moveLeft();
  } else if (playField.snake.point[0].direction === 'right') {
    playField.snake.moveRight();
  }
  checkAndPaint();
  setTimeout(() => {
    requestId = requestAnimationFrame(step);
  }, 1000 / 2);
}

requestId = requestAnimationFrame(step);
