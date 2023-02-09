import { PlayField } from './playField.js';

const board = document.querySelector('.board');
const playField = new PlayField(17);

document.addEventListener('keydown', (event) => {
  const keyName = event.key;

  playField.changeSnakeDirection(keyName);
});

function loop() {
  playField.update();

  board.innerHTML = `<pre>${playField.paint()}</pre>`;

  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 1000 / 2);
}

loop();
