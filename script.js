// gameBoardArray[0][0]
// gameBoardArray[0][1]
// gameBoardArray[0][2]
// gameBoardArray[1][0]
// gameBoardArray[1][1]
// gameBoardArray[1][2]
// gameBoardArray[2][0]
// gameBoardArray[2][1]
// gameBoardArray[2][2]

// horizontal 
// gameBoardArray[0][0] === gameBoardArray[0][1] && gameBoardArray[0][1] === gameBoardArray[0][2]
// gameBoardArray[1][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[1][2]
// gameBoardArray[2][0] === gameBoardArray[2][1] && gameBoardArray[2][1] === gameBoardArray[2][2]

// vertical 
// gameBoardArray[0][0] === gameBoardArray[1][0] && gameBoardArray[1][0] === gameBoardArray[2][0]
// gameBoardArray[0][1] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][1]
// gameBoardArray[0][2] === gameBoardArray[1][2] && gameBoardArray[1][2] === gameBoardArray[2][2]

// diagonal
// gameBoardArray[1][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][2]
// gameBoardArray[0][0] === gameBoardArray[0][1] && gameBoardArray[0][1] === gameBoardArray[0][2]

const gameBoard = document.getElementById('gameboard');
const nextRoundBtn = document.getElementById('next-round-btn');

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
     function displayPlayerCharacter() {
          return mark;
     }
     function resetWins() {
          wins = 0;
     }
     return { name, mark, increaseWinsByOne, displayWins, displayPlayerCharacter, getWins, resetWins };
};

const playerOne = player('Josh', 'X');
const playerTwo = player('Sam', '0');

console.log({ Josh: playerOne.mark, Sam: playerTwo.mark });

const gameBoardArray = [
     [1, 2, 3],
     [4, 5, 6],
     [7, 8, 9],
];

function addMarkToGameboardArray(mark, i, j) {
     gameBoardArray[i][j] = mark;
};

let clicks = 0;
let rounds = 0;
gameBoard.addEventListener('click', function () {
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
          // the round should end if a st line is formed!
          // maybe add a pop-up to stop the user from entering any more marks
          // or better yet, just reset the gameboard few seconds after the round has been won.
          // or maybe use an if statement to check if a strt line is formed, if it is, do not let the user enter 
          // anymore marks

          // what if the round is a tie???
          // there wont be any mark returned
          if (checkForStrtLine()) {
               const playerSignOfStLine = checkForStrtLine();
               console.log({ PlayerSignOfStLine: playerSignOfStLine });
               declareRoundWinner(playerSignOfStLine);
               if (rounds == 3) {
                    declareGameWinner();
               }
          }
     };
});
/* i need to rethink logic for the clicks, counting rounds, and */

function checkForStrtLine() {
     let playerSignOfStLine = null;
     let strtLine = null;
     // btw one more thing can happen, what if there are two st lines? 
     // one of X and one of 0, st. line which forms first should win!


     // diagonals
     if (gameBoardArray[0][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = 'diagonal-left';
     }
     if (gameBoardArray[2][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[0][2]) {
          playerSignOfStLine = gameBoardArray[2][0];
          strtLine = 'diagonal-right'
     }

     // verticals
     if (gameBoardArray[0][0] === gameBoardArray[1][0] && gameBoardArray[1][0] === gameBoardArray[2][0]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = 'column-0';
     }
     if (gameBoardArray[0][1] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[2][1]) {
          playerSignOfStLine = gameBoardArray[0][1];
          strtLine = 'column-1';
     }
     if (gameBoardArray[0][2] === gameBoardArray[1][2] && gameBoardArray[1][2] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[0][2];
          strtLine = 'column-2';
     }

     // horizontals
     if (gameBoardArray[0][0] === gameBoardArray[0][1] && gameBoardArray[0][1] === gameBoardArray[0][2]) {
          playerSignOfStLine = gameBoardArray[0][0];
          strtLine = 'row-0';
     }
     if (gameBoardArray[1][0] === gameBoardArray[1][1] && gameBoardArray[1][1] === gameBoardArray[1][2]) {
          playerSignOfStLine = gameBoardArray[1][0];
          strtLine = 'row-1';
     }
     if (gameBoardArray[2][0] === gameBoardArray[2][1] && gameBoardArray[2][1] === gameBoardArray[2][2]) {
          playerSignOfStLine = gameBoardArray[2][0];
          strtLine = 'row-2';
     }

     return playerSignOfStLine;
     /* return an object */
};



function getIndexOfCellsOfStrtLine() {
     // so now i have to go from the array to the dom elements
     // i need to know the index of all the three cells in strt line 
     // match those three cells in the dom gameboard and add a class 
     // that adds color to them
     const strtLineInfo = returnStrtLine().split('-');

     if (strtLineInfo[0] == 'row') {
          if (strtLineInfo[1] == 0) { }
          else if (strtLineInfo[1] == 1) { }
          else if (strtLineInfo[1] == 2) { }
     }
     else if (strtLineInfo[0] == 'column') {
          if (strtLineInfo[1] == 0) { }
          else if (strtLineInfo[1] == 1) { }
          else if (strtLineInfo[1] == 2) { }
     }
     else if (strtLineInfo[0] == 'diagonal') {
          if (strtLineInfo[1] == 'left') { }
          else if (strtLineInfo[1] == 'right') { }
     }

     for (let cell of gameBoard.children) {
          if (cell.getAttribute('data-cellRow') == 'rowIndex' && cell.getAttribute('data-cellColumn') == 'columnIndex') {
               cell.classList.add('straight-line-cell');
          }
     }
};


console.log(gameBoardArray);

function declareRoundWinner(playerSign) {
     if (playerSign == playerOne.mark) {
          console.log(`${playerOne.name} is the round winner`);
          playerOne.increaseWinsByOne();
     } else if (playerSign == playerTwo.mark) {
          console.log(`${playerTwo.name} is the round winner`);
          playerTwo.increaseWinsByOne();
     }
     playerOne.displayWins();
     playerTwo.displayWins();
     rounds++;
};

function declareGameWinner() {
     if (playerOne.getWins() > playerTwo.getWins()) {
          console.log(`${playerOne.name} is the winner of the game`)
     } else if (playerTwo.getWins() > playerOne.getWins()) {
          console.log(`${playerTwo.name} is the winner of the game`)
     } else {
          console.log('The game is a tie.')
          alert(`The game is a tie.`)
     }
     playerOne.resetWins();
     playerTwo.resetWins();
     rounds = 0;
};

nextRoundBtn.addEventListener('click', resetGameboard);

function resetGameboard() {
     gameBoardArray[0] = [1, 2, 3];
     gameBoardArray[1] = [4, 5, 6];
     gameBoardArray[2] = [7, 8, 9];

     clicks = 0;

     for (let cell of gameBoard.children) {
          if (cell.classList.contains('cross')) {
               cell.classList.remove('cross');
          }
          else if (cell.classList.contains('circle')) {
               cell.classList.remove('circle')
          }
     }
};
