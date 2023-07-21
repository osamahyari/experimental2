'use strict';

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayNumber = function (number) {
  document.querySelector('.number').textContent = number;
};

const displayHighscore = function (highscore) {
  document.querySelector('.highscore').textContent = highscore;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const changeBackground = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const getRandom = function () {
  let randomNumber = Math.trunc(Math.random() * 20) + 1;
  return randomNumber;
};

const checkFunction = function () {
  const guess = Number(document.querySelector('.guess').value);
  let score = Number(document.querySelector('.score').textContent);
  if (!guess) {
    displayMessage('no number bro');
  } else if (guess == myNumber) {
    displayMessage('Correct number');
    changeBackground('#60b347');
    document.querySelector('.number').style.width = '30rem';
    Number(document.querySelector('.highscore').textContent) < score
      ? displayHighscore(score)
      : null;
    displayNumber(myNumber);
    document.querySelector('.check').disabled = true;
  } else {
    if (score > 1) {
      guess > myNumber ? displayMessage('Too High') : displayMessage('Too Low');
      score--;
      displayScore(score);
    } else {
      displayMessage('You Lost');
      document.querySelector('.check').disabled = true;
      displayScore(score - 1);
    }
  }
};

const againFunction = function () {
  displayScore(originalScore);
  displayNumber('?');
  displayMessage('Start Guessing');
  document.querySelector('.guess').value = '';
  changeBackground('#222');
  myNumber = getRandom();
  document.querySelector('.check').disabled = false;
  document.querySelector('.number').style.width = '15rem';
};

document.querySelector('.check').addEventListener('click', checkFunction);
document.querySelector('.again').addEventListener('click', againFunction);
let myNumber = getRandom();
const originalScore = Number(document.querySelector('.score').textContent);
displayNumber('?');
