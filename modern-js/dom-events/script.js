'use strict';

const INITIAL_SCORE = 20;
let secretNumber;
let score;
let highScore = 0;

const randomSecretNumber = () => {
    return Math.trunc(Math.random() * INITIAL_SCORE) + 1;
};

const displayMessage = (message) => {
    document.querySelector('.message').textContent = message;
};

const checkNumberHandler = () => {
    const guess = parseInt(document.querySelector('.guess').value);

    if (!guess) {
        displayMessage('No Number!');
    } else if (guess === secretNumber) {
        displayMessage('Correct Number!');

        document.querySelector('.number').textContent = secretNumber;
        document.querySelector('.number').style.width = '30rem';
        document.querySelector('body').style.backgroundColor = '#60b347';

        if (score > highScore) {
            highScore = score;
            document.querySelector('.highscore').textContent = highScore;
        }
    } else if (guess !== secretNumber) {
        if (--score > 0) {
            displayMessage(guess > secretNumber ? 'Too High!' : 'Too Low!');
            document.querySelector('.score').textContent = score;
        } else {
            displayMessage('You lost the game!');
            document.querySelector('.score').textContent = 0;
        }
    }
};

const initGame = () => {
    score = INITIAL_SCORE;
    secretNumber = randomSecretNumber();
};

/* Coding Challenge #1
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
    1. Select the element with the 'again' class and attach a click event handler
    2. In the handler function, restore initial values of the 'score' and
        'secretNumber' variables
    3. Restore the initial conditions of the message, number, score and guess input
        fields
    4. Also restore the original background color (#222) and number width (15rem)
*/

const resetUI = () => {
    document.querySelector('.score').textContent = INITIAL_SCORE;
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').value = '';
    document.querySelector('body').style.backgroundColor = '#222';
    document.querySelector('.number').style.width = '15rem';
};

const resetGameHandler = () => {
    score = INITIAL_SCORE;
    secretNumber = randomSecretNumber();
    displayMessage('Start guessing...');
    resetUI();
};

initGame();

document.querySelector('.check').addEventListener('click', checkNumberHandler);
document.querySelector('.again').addEventListener('click', resetGameHandler);
