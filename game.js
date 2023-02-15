import { PlayField } from './playField.js';
import { Pages } from './pages.js';

const board = document.querySelector('.board');
const counterBox = document.querySelector('.counter');
const btnContainer = document.querySelector('.btn-container');
const mainPageBtn = document.querySelector('.main-page-btn');
const pauseBtn = document.querySelector('.pause-btn');
const restartBtn = document.querySelector('.restart-btn');
const fieldSize = 24;
let playField = new PlayField(fieldSize);
let isPaused = false;
let isSplashScreen = false;
let isNewRecord = false;
let keyNames = [];
let timeoutId = 0;
let speed = 170;
let speedGear = 0;
const pointsForSpeedIncrease = [5, 10, 20, 30, 40, 50];

function updateHighScores() {
  if (JSON.parse(localStorage.getItem('highScores')) === null) {
    localStorage.setItem('highScores', JSON.stringify([]));
  }
  const score = playField.counter;

  if (score === 0) {
    return;
  }
  const name = localStorage.getItem('name');
  const newRecord = { score, name };
  const highScoresData = JSON.parse(localStorage.getItem('highScores'));
  const scoresArray = highScoresData.map((object) => object.score);

  if (highScoresData.length === 0) {
    highScoresData[0] = newRecord;
  } else {
    let index = null;
    for (let i = 0; i < scoresArray.length; i++) {
      if (
        playField.counter > scoresArray[i] &&
        !scoresArray.includes(playField.counter)
      ) {
        index = i;
        break;
      }
    }

    if (index === 0) {
      isNewRecord = true;
    }

    if (index !== null) {
      if (scoresArray.length < 10) {
        highScoresData.splice(index, 0, newRecord);
      } else {
        highScoresData.splice(index, 0, newRecord);
        highScoresData.pop();
      }
    } else if (
      scoresArray.length < 10 &&
      !scoresArray.includes(playField.counter)
    ) {
      highScoresData[highScoresData.length] = newRecord;
    }
  }

  localStorage.setItem('highScores', JSON.stringify(highScoresData));
}

function loop() {
  board.classList.add('active');
  btnContainer.classList.add('active');
  counterBox.classList.add('active');

  timeoutId = setInterval(() => {
    if (!isPaused) {
      const newSpeedGear =
        pointsForSpeedIncrease.indexOf(playField.counter) + 1;
      if (newSpeedGear && newSpeedGear !== speedGear) {
        speedGear += 1;
        speed -= 20;
        clearInterval(timeoutId);
        loop();
      }

      playField.snake.changeSnakeDirection(keyNames[0]);
      keyNames.shift();
      playField.update();
      const score = playField.counter.toString();
      counterBox.innerHTML = `<p>${score.padStart(
        4,
        '0'
      )}</p><p>${localStorage.getItem('name')}</p>`;
      board.innerHTML = playField.paint();

      if (playField.isGameOver) {
        pauseBtn.disabled = 'true';
        clearInterval(timeoutId);
        keyNames = [];
        updateHighScores();
        Pages.gameOver(playField.counter, isNewRecord);
        isNewRecord = false;
      }
    } else {
      clearInterval(timeoutId);
    }
  }, speed);
}

function controlScheme() {
  Pages.controlScheme();
  const gotItBtn = document.querySelector('.got-it');
  gotItBtn.addEventListener('click', splashScreen);
}

function splashScreen() {
  board.classList.add('active');
  btnContainer.classList.add('active');
  counterBox.classList.add('active');
  const score = playField.counter.toString();
  counterBox.innerHTML = `<p>${score.padStart(
    4,
    '0'
  )}</p><p>${localStorage.getItem('name')}</p>`;
  isSplashScreen = true;
  board.innerHTML = `<div class='alert-msg'><img src="./images/arrow-buttons.svg" alert="arrow-buttons"><p>Press arrow button to start</p></div>${playField.paint()}`;
  document.addEventListener('keydown', validateKeyPress);
}

function setName() {
  Pages.setName();
  const goBack = document.querySelector('.go-back');
  goBack.addEventListener('click', mainPage);
  const form = document.querySelector('.name-form');
  form.addEventListener('submit', (e) => {
    if (!localStorage.getItem('name')) {
      Pages.sendNameToLocalStorage(e);
      controlScheme();
    } else {
      Pages.sendNameToLocalStorage(e);
      mainPage();
    }
  });
}

function highScores() {
  Pages.highScoresTable();
  const goBack = document.querySelector('.go-back');
  goBack.addEventListener('click', mainPage);
}

function startGame() {
  if (!localStorage.getItem('name')) {
    setName();
  } else {
    controlScheme();
  }
}

function continueOrPauseGame() {
  if (isPaused) {
    pauseBtn.innerHTML = 'Pause';
    isPaused = false;
    keyNames = [];
    loop();
  } else {
    isPaused = true;
    pauseBtn.innerHTML = 'Continue';
  }
}

function restartGame() {
  isPaused = false;
  pauseBtn.innerHTML = 'Pause';
  pauseBtn.removeAttribute('disabled');
  keyNames = [];
  playField = new PlayField(fieldSize);

  if (timeoutId) {
    clearInterval(timeoutId);
  }
  splashScreen();
}

function validateKeyPress(event) {
  const snake = playField.snake.points[0];
  const lastKeyName = keyNames[keyNames.length - 1];
  const snakeMoveBtns = playField.snake.moveBtnsList;
  const pushKey = snakeMoveBtns[event.code];

  switch (event.code) {
    case 'KeyP':
      if (!pauseBtn.disabled) {
        continueOrPauseGame();
      }
      break;
    case 'KeyR':
      restartGame();
      break;
    default:
      break;
  }

  if (Object.keys(snakeMoveBtns).includes(event.code)) {
    if (isSplashScreen) {
      isSplashScreen = false;
      const alertMsg = document.querySelector('.alert-msg');
      alertMsg.classList.add('hidden');
      loop();
    }

    if (keyNames.length === 0) {
      if (
        pushKey.move !== snake.direction &&
        pushKey.donotmove !== snake.direction
      ) {
        keyNames.push(pushKey.move);
      }
    } else {
      if (pushKey.move !== lastKeyName && pushKey.donotmove !== lastKeyName) {
        keyNames.push(pushKey.move);
      }
    }
  }
}

function mainPage() {
  Pages.mainMenu();
  document.removeEventListener('keydown', validateKeyPress);
  const startBtn = document.querySelector('.start-btn');
  const highSoreTableBtn = document.querySelector('.high-score-btn');
  const changeNameBtn = document.querySelector('.change-name-btn');

  if (playField.isGameOver) {
    startBtn.innerHTML = 'Restart';
    startBtn.addEventListener('click', () => {
      restartGame();
      document.addEventListener('keydown', validateKeyPress);
    });
  } else if (isPaused) {
    startBtn.innerHTML = 'Continue';
    startBtn.addEventListener('click', () => {
      continueOrPauseGame();
      document.addEventListener('keydown', validateKeyPress);
    });
  } else {
    startBtn.addEventListener('click', startGame);
  }

  if (changeNameBtn) {
    changeNameBtn.addEventListener('click', setName);
  }
  highSoreTableBtn.addEventListener('click', highScores);
}

window.addEventListener('load', mainPage, {
  once: true,
});

mainPageBtn.addEventListener('click', () => {
  btnContainer.classList.remove('active');
  counterBox.classList.remove('active');

  if (!isPaused) {
    continueOrPauseGame();
    mainPage();
  } else {
    mainPage();
  }
});
pauseBtn.addEventListener('click', continueOrPauseGame);
restartBtn.addEventListener('click', restartGame);
