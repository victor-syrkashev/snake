const board = document.querySelector('.board');

const avatarIcon =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z"/></svg>';
const subMenu =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"/></svg>';

class Pages {
  static mainMenu() {
    board.classList.add('active');
    const playerName = localStorage.getItem('name');
    board.innerHTML = `<div class="main-menu"><div class="player-name"><div class="avatar">${avatarIcon}</div><p>${playerName}</p><button type="button" class="sub-menu">${subMenu}</button><button type="button" class="change-name-btn">change name</button></div><img src="./images/snake-title.svg" alt="title" /><button type="button" class="start-btn">Start Game</button><button type="button" class="high-score-btn">High score table</button></div>`;

    if (!playerName) {
      const playerNameContainer = document.querySelector('.player-name');
      playerNameContainer.classList.add('hidden');
    }
  }

  static setName() {
    board.classList.add('active');
    board.innerHTML =
      '<div class="set-name"><h1>Please enter your name:</h1><form class="name-form"><input type="text" class="input-name" name="name" maxlength="20" required><div><button type="button" class="go-back">Go back</button><button class="submit-btn">Ok</button></div></form></div>';
  }

  static controlScheme() {
    board.classList.add('active');
    board.innerHTML =
      '<div class="control-scheme"><image class="arrow-key" src="./images/arrow-buttons.svg" alt="arrow-key-control"><div class="keys-container"><image class="key-p" src="./images/p-button.svg" alt="pause-or-continue-by-p-key"><p>- Pause/Continue</p><image class="key-q" src="./images/r-button.svg" alt="restart-by-q-key"><p>- Restart</p></div><p>Pick up as many apples as you can.</p><p>Be careful! Running off the playfield or into your own tail will end the game.</p><button class="got-it">Got it</button></div>';
  }

  static highScoresTable() {
    board.classList.add('active');
    const highScoreData = JSON.parse(localStorage.getItem('highScores'));
    let scoreColumn = '';
    let nameColumn = '';

    for (let i = 0; i < highScoreData.length; i++) {
      scoreColumn += `<div class="score-cell">${highScoreData[i].score}</div>`;
      nameColumn += `<div class="name-cell">${highScoreData[i].name} 
    </div>`;
    }
    board.innerHTML = `<div class='high-scores-table'><h1>High Scores</h1><div class="column-scores">${scoreColumn}</div><div class="column-names">${nameColumn}</div><button type="button" class="go-back">Go back</button></div>`;
  }

  static gameOver(score, isNewRecord) {
    board.classList.add('active');

    if (isNewRecord) {
      board.innerHTML = `<div class="game-over"><h1>Game Over</h1><p class='score'>${score}</p><p>👑 New record 👑</p></div>`;
    } else {
      board.innerHTML = `<div class="game-over"><h1>Game Over</h1><p class='score'>${score}</p></div>`;
    }
  }

  static sendNameToLocalStorage(e) {
    e.preventDefault();
    const childList = Array.from(e.target.children);
    const inputValue = childList
      .filter((item) => !!item.name)
      .map((element) => {
        const { name, value } = element;
        return { name, value };
      });
    localStorage.setItem('name', inputValue[0].value);
  }
}

export { Pages };
