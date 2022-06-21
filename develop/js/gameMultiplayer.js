'use strict';

/**-------------------------
 **    GLOBAL VARIABLES
 *------------------------**/
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
  [0, 1, 2], // horizontal victories
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // vertical victories
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonal victories
  [2, 4, 6],
];

// const players = document.querySelectorAll('[data-player]');

const nextButton = document.getElementById('nextButton');

const restartButton = document.getElementById('restartButton');

const winningMessageBanner = document.getElementById('banner');
const winningMessageText = document.querySelector(
  '[data-winning-message-text]'
);
const winningMessageRoundWinnerWrapper = document.getElementById(
  'banner__round-winner'
);
const winningMessageRoundWinner = document.querySelector(
  '[data-winning-message-round-winner]'
);
const overlay = document.getElementById('overlay');

let oTurn;

/**-------------------------
 **   CALLBACK FUNCTIONS
 *------------------------**/
const scoreKeeper = () => {
  //   players.forEach((player) => {});
};

//FIXME: Hover states not showing except for the middle
// show hover states
const setBoardHoverClass = () => {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
};

// changes x and o
const swapTurns = () => {
  oTurn = !oTurn;
};

// check to see if all grid spaces are full
const isDraw = () => {
  // de-structure cellElements because it doesn't have an 'every' method
  return [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });
};

// check to see if the game has been won by someone or its a draw
const endGame = (draw) => {
  // show the banner and give the draw/winning message
  if (draw) {
    winningMessageText.innerText = '';
    winningMessageRoundWinnerWrapper.innerHTML = 'round tied';
    // winningMessageRoundWinnerWrapper.classList.add('hide');
  } else {
    winningMessageText.innerText = `${
      oTurn ? 'player 1 wins!' : 'player 2 wins!'
    }`;
    winningMessageRoundWinner.innerHTML = `
    ${
      oTurn
        ? (winningMessageRoundWinner.src = '../assets/icon-o.svg')
        : (winningMessageRoundWinner.src = '../assets/icon-x.svg')
    }
    `;
  }
  winningMessageBanner.classList.remove('hide');
  overlay.classList.remove('hide');
};

// check to see if who won
const checkWin = (currentClass) => {
  // return true if any values inside are true
  return WINNING_COMBINATIONS.some((combination) => {
    // return true if all the cells that make up a winning combination contain the same class
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

// add the class x or o to the current cell
const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

// handles what happens when a user clicks on a cell block
const handleClick = (e) => {
  // select the cell that was clicked on
  const cell = e.target;

  // find out who's turn it is
  const currentClass = oTurn ? O_CLASS : X_CLASS;

  // display x or o
  placeMark(cell, currentClass);

  // check for a win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    // show hover states
    setBoardHoverClass();
  }
};

/**-------------------------
 **    PROCEDURAL CODE
 *------------------------**/
// begin the game
function startGame() {
  // keeps track of everything in the score div
  //   scoreKeeper();

  // decide whether to show the initial hover state or not
  oTurn = false;

  cellElements.forEach((cell) => {
    // un-set everything for game restart
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);
    cell.removeEventListener('click', handleClick);

    // fire the event listener only once
    cell.addEventListener('click', handleClick, { once: true });
  });

  // show x or o when hovering over a free board cell
  setBoardHoverClass();

  // remove banner and overlay
  winningMessageBanner.classList.add('hide');
  overlay.classList.add('hide');
}

startGame();

// restart game button
restartButton.addEventListener('click', startGame);

// for now, will just restart the game since score is not being kept yet
nextButton.addEventListener('click', startGame);
