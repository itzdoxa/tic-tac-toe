const gameBoard = document.getElementById('gameboard');
const nextRoundBtn = document.getElementById('next-round-btn');

const commentaryBoard = document.getElementById('commentary-board');
const playerOneScoreBoard = document.getElementById('player-one-score-board');
const playerTwoScoreBoard = document.getElementById('player-two-score-board');
const roundCountBoard = document.getElementById('round-count-board');

const form = document.getElementById('form');
const playerOneNameInput = document.getElementById('player-one-name-input');
const playerTwoNameInput = document.getElementById('player-two-name-input');
const playerOneNameDisplay = document.getElementById('player-one-name-display');
const playerTwoNameDisplay = document.getElementById('player-two-name-display');


const startGameInfo = document.getElementById('start-game-info');

/*
the game is starting without the start button
so first i need to prevent the user from entering marks without the start button, and
i could do that either by removing the gameboard and showing it when the use clicks start

next round count error 
show the next round button only when the round has ended, not at the start and during it
*/

/** make an function for restarting the game */

function player(name, mark) {
     let wins = 0

     function increaseWinsByOne() {
          wins++;
     }
     function displayWins() {
          console.log(`${name} has ${wins} wins.`);
     }
     function getWins() {
          return wins;
     }
     function getPlayerMark() {
          return mark;
     }
     function resetWins() {
          wins = 0;
     }
     return { name, mark, increaseWinsByOne, displayWins, getPlayerMark, getWins, resetWins };
};

const playerOne = player('playerOne', 'X');
const playerTwo = player('playerTwo', '0');
const defaultNameOne = 'playerOne';
const defaultNameTwo = 'playerTwo';

let startBtnClicked = false;

form.addEventListener('submit', function () {
     event.preventDefault();

     startBtnClicked = true;
     playerOne.name = playerOneNameInput.value || defaultNameOne;
     playerTwo.name = playerTwoNameInput.value || defaultNameTwo;

     startGameInfo.style.display = 'block';
     form.style.display = 'none';

     playerOneNameDisplay.textContent = playerOne.name;
     playerTwoNameDisplay.textContent = playerTwo.name;

});

const gameBoardArray = [
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9],
];

function addMarkToGameboardArray(mark, row, column) {
     gameBoardArray[row][column] = mark;
};

let clicks = 0;
let rounds = 1;
let straightLineFound = false; // this variable makes and breaks the game, should it be a global variable?

gameBoard.addEventListener('click', function () {

     // stop the user from entering another mark if a straight line is already found
     if (straightLineFound) return;

     if (startBtnClicked == false) return;
     if (!event.target.classList.contains('cell')) return;
     if (event.target.classList.contains('circle') || event.target.classList.contains('cross')) return;

     let cell = event.target;

     if (clicks % 2 == 0) {
          cell.classList.add('cross');
          addMarkToGameboardArray('X', cell.getAttribute('data-cellRow'), cell.getAttribute('data-cellColumn'));
     } else {
          cell.classList.add('circle');
          addMarkToGameboardArray('0', cell.getAttribute('data-cellRow'), cell.getAttribute('data-cellColumn'));
     }

     clicks++;

     if (clicks >= 5) {
          const straightLineInfo = checkForStrtLine();

          if (straightLineInfo.strtLine) { // no straight line found if its null

               console.log({ PlayerSignOfStLine: straightLineInfo.playerSignOfStLine });
               declareRoundWinner(straightLineInfo.playerSignOfStLine);
               colorStrtLine();
               rounds++;
               if (rounds > 3) {
                    declareGameWinner();
                    // ask to start game again (dont actually write here, see where this logic should be written)
               }

               straightLineFound = true;

          } else if (clicks == 9) {
               declareRoundWinner(straightLineInfo.playerSignOfStLine);
               clicks = 0;
               rounds++;
          }
     };
});

function checkForStrtLine() {
     let playerSignOfStLine = null;
     let strtLine = null;

     // diagonals
     if (gameBoardArray[0][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = [['0,0'], ['1,1'], ['2,2']];
          return { playerSignOfStLine, strtLine };
     }
     if (gameBoardArray[2][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[0][2]) {
          playerSignOfStLine = gameBoardArray[2][0];
          strtLine = [['2,0'], ['1,1'], ['0,2']];
          return { playerSignOfStLine, strtLine };
     }

     // verticals
     if (gameBoardArray[0][0] === gameBoardArray[1][0] && gameBoardArray[1][0] === gameBoardArray[2][0]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = [['0,0'], ['1,0'], ['2,0']];
          return { playerSignOfStLine, strtLine };
     }
     if (gameBoardArray[0][1] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][1]) {
          playerSignOfStLine = gameBoardArray[0][1];
          strtLine = [['0,1'], ['1,1'], ['2,1']];
          return { playerSignOfStLine, strtLine };
     }
     if (gameBoardArray[0][2] === gameBoardArray[1][2] && gameBoardArray[1][2] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[0][2];
          strtLine = [['0,2'], ['1,2'], ['2,2']];
          return { playerSignOfStLine, strtLine };
     }

     // horizontals
     if (gameBoardArray[0][0] === gameBoardArray[0][1] && gameBoardArray[0][1] === gameBoardArray[0][2]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = [['0,0'], ['0,1'], ['0,2']];
          return { playerSignOfStLine, strtLine };
     }
     if (gameBoardArray[1][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[1][2]) {
          playerSignOfStLine = gameBoardArray[1][0];
          strtLine = [['1,0'], ['1,1'], ['1,2']];
          return { playerSignOfStLine, strtLine };
     }
     if (gameBoardArray[2][0] === gameBoardArray[2][1] && gameBoardArray[2][1] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[2][0];
          strtLine = [['2,0'], ['2,1'], ['2,2']];
          return { playerSignOfStLine, strtLine };
     }

     return { playerSignOfStLine, strtLine };
};

function colorStrtLine() {
     const strtLine = checkForStrtLine().strtLine;

     strtLine.forEach(cell => {
          const [cellRow, cellColumn] = cell[0].split(',');
          const targetCell = gameBoard.querySelector(`[data-cellRow="${cellRow}"][data-cellColumn="${cellColumn}"]`);

          if (targetCell) {
               targetCell.classList.add('straight-line-cell');
          }
     });
};

console.log(gameBoardArray);

function declareRoundWinner(playerSign) {
     if (playerSign == playerOne.mark) {
          console.log(`${playerOne.name} is the round winner`);
          commentaryBoard.textContent = `${playerOne.name} is the round winner`;
          playerOne.increaseWinsByOne();
          playerOneScoreBoard.textContent = playerOne.getWins();

     } else if (playerSign == playerTwo.mark) {
          console.log(`${playerTwo.name} is the round winner`);
          commentaryBoard.textContent = `${playerTwo.name} is the round winner`;
          playerTwo.increaseWinsByOne();
          playerTwoScoreBoard.textContent = playerTwo.getWins();
     } else if (playerSign === null) {
          commentaryBoard.textContent = 'The round is a tie!';
     }
     playerOne.displayWins();
     playerTwo.displayWins();
};

function declareGameWinner() {
     if (playerOne.getWins() > playerTwo.getWins()) {
          console.log(`${playerOne.name} is the winner of the game`)
          commentaryBoard.textContent = `${playerOne.name} is the winner of the game!`;
     } else if (playerTwo.getWins() > playerOne.getWins()) {
          console.log(`${playerTwo.name} is the winner of the game`)
          commentaryBoard.textContent = `${playerTwo.name} is the winner of the game!`;
     } else {
          commentaryBoard.textContent = 'The game is a tie!'
     }

     playerOne.resetWins();
     playerTwo.resetWins();

     // playerOneScoreBoard.textContent = playerOne.getWins();
     // playerTwoScoreBoard.textContent = playerTwo.getWins();
     // these should be changed when the user restarts the game
};

nextRoundBtn.addEventListener('click', resetGameboard);

/** i need to separate the code for resetting the gameboard and managing round count */

function resetGameboard() {
     roundCountBoard.textContent = rounds;

     straightLineFound = false;

     gameBoardArray[0] = [1, 2, 3];
     gameBoardArray[1] = [4, 5, 6];
     gameBoardArray[2] = [7, 8, 9];

     clicks = 0;

     for (let cell of gameBoard.children) {
          cell.classList.remove('straight-line-cell')
          cell.classList.remove('cross');
          cell.classList.remove('circle')
     }

     commentaryBoard.textContent = '';

     if (rounds > 3) {
          roundCountBoard.textContent = '1';
          rounds = 1;

          // should not be here, separate the code
          playerOneScoreBoard.textContent = playerOne.getWins();
          playerTwoScoreBoard.textContent = playerTwo.getWins();
     }
};
