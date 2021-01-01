/*
GAME FUNCTION:
- Player must guess a number between a min and a max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of the correct answer if loose
- Let player choose to play again
*/

class Game {
  constructor(min, max, guessesLeft) {
    this.max = max;
    this.min = min;
    this.winningNum = Math.floor(Math.random() * (this.max - this.min) + 1);
    this.guessesLeft = guessesLeft;
  }
}
// UI elements
const game = document.querySelector('#game'),
  minNum = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  attempts = document.querySelector('.guesses-left'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

// START THE GAME
let theGame = new Game(1, 10, 3);
console.log(`max: ${theGame.max}`);
console.log(`min: ${theGame.min}`);
console.log(`winningNum: ${theGame.winningNum}`);
console.log(`guessesLeft: ${theGame.guessesLeft}`);

// Assign min and max and an amount of attempts
minNum.textContent = theGame.min;
maxNum.textContent = theGame.max;
attempts.textContent = theGame.guessesLeft;

// Listen for guess
game.addEventListener('submit', function (e) {
  if (guessBtn.value.toLowerCase() === 'play again') {
    theGame = new Game(1, 10, 3);
    return;
  }
  const inputValue = guessInput.value;
  guessInput.value = '';
  inputChecker(inputValue);

  e.preventDefault();
});
// Input field listen for input
guessInput.addEventListener('focus', clearStyles);

// Initialize the game
document.addEventListener('DOMContentLoaded', theGame);
//  Input Checker
function inputChecker(val) {
  if (isNaN(val) || val < theGame.min || val > theGame.max) {
    errorMessage();
  } else {
    compareNumbers(val, theGame.winningNum);
  }
}
// Error Message
function errorMessage() {
  // Create errorDiv
  const errorDiv = document.createElement('div');
  // Set className to the div
  errorDiv.className = 'alert alert-danger';
  // Create error text and append it to the div
  errorDiv.appendChild(
    document.createTextNode(
      `Please, enter the number between ${theGame.min} and ${theGame.max}.`
    )
  );
  // Get the element (to insert error div before)
  const p = document.querySelector('p');
  // Append container with the error div
  game.insertBefore(errorDiv, p);
  // Clear Error
  setTimeout(function () {
    errorDiv.remove();
  }, 2000);
}
// Clear styles
function clearStyles() {
  guessInput.value = '';
  guessInput.className = '';
  message.textContent = '';
}

// Compare guess and the number
function compareNumbers(guessNum, winNum) {
  console.log('guessNum', guessNum);
  if (parseInt(guessNum) === winNum) {
    message.textContent = `Yes, you've guessed it! It's ${guessNum}`;
    message.style.color = 'green';
    guessInput.className = 'right';
    guessBtn.setAttribute('value', 'Play again');
  } else {
    if (theGame.guessesLeft > 1) {
      console.log(`guessesLeft: ${theGame.guessesLeft}`);
      theGame.guessesLeft -= 1;
      console.log(`guessesLeft: ${theGame.guessesLeft}`);
      message.textContent = `Nah, you're wrong. ${theGame.guessesLeft} guesses left.`;
      guessInput.className = 'wrong';
      attempts.textContent = theGame.guessesLeft;
      message.style.color = 'red';
    } else {
      theGame.guessesLeft -= 1;
      attempts.textContent = theGame.guessesLeft;
      message.textContent = `Game over. The correct answer was ${winNum}`;
      guessBtn.setAttribute('value', 'Play again');
    }
  }
}
