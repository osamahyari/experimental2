'use strict';

const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');
const diceElement = document.querySelectorAll('.dice');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const newButton = document.querySelector('.btn--new');
const currentScores = document.querySelectorAll('.current-score');
const players = document.querySelectorAll('.player');
const mainScores = document.querySelectorAll('.score');
let turn = 0;

const changeTurn = function (turn) {
  players[turn % 2].classList.remove('player--active');
  turn++;
  players[turn % 2].classList.add('player--active');
};

const showDice = function (randomNumber) {
  diceElement[randomNumber - 1].classList.remove('hidden');
  console.log('out');
};

const hideDice = function () {
  for (let i = 0; i <= 5; i++) {
    diceElement[i].classList.add('hidden');
    console.log('exiting');
  }
};

const clearScores = function (turn) {
  mainScores[turn % 2].textContent = 0;
  currentScores[turn % 2].textContent = 0;
  mainScores[(turn + 1) % 2].textContent = 0;
  currentScores[(turn + 1) % 2].textContent = 0;
};

const changeCurrentScore = function (turn, newValue) {
  currentScores[turn % 2].textContent = newValue;
};

const changeMainScore = function (turn, newValue) {
  mainScores[turn % 2].textContent = newValue;
};

const getRandom = function () {
  let randomNumber = Math.trunc(Math.random() * 6) + 1;
  return randomNumber;
};

const rollFunction = function () {
  hideDice();
  let roll = getRandom();
  if (roll === 1) {
    showDice(roll);
    changeCurrentScore(turn, 0);
    changeTurn(turn);
    turn++;
  } else {
    showDice(roll);
    changeCurrentScore(
      turn,
      Number(currentScores[turn % 2].textContent) + roll
    );
  }
};

const holdFunction = function () {
  changeMainScore(
    turn,
    Number(currentScores[turn % 2].textContent) +
      Number(mainScores[turn % 2].textContent)
  );
  changeCurrentScore(turn, 0);
  if (Number(mainScores[turn % 2].textContent) <= 99) {
    changeTurn(turn);
    turn++;
  } else {
    players[turn % 2].classList.add('player--winner');
    changeMainScore(
      turn,
      Number(currentScores[turn % 2].textContent) +
        Number(mainScores[turn % 2].textContent)
    );

    rollButton.disabled = true;
    holdButton.disabled = true;
    hideDice();
  }
};

const newFunction = function () {
  hideDice();
  changeTurn(1);
  clearScores(turn);
  players[turn % 2].classList.remove('player--winner');
  players[(turn + 1) % 2].classList.remove('player--winner');
  rollButton.disabled = false;
  holdButton.disabled = false;
};

scoreElement0.textContent = 0;
scoreElement1.textContent = 0;
rollButton.addEventListener('click', rollFunction);
holdButton.addEventListener('click', holdFunction);
newButton.addEventListener('click', newFunction);
