/*
GAME FUNCTION
- Player must guess a number between min and max
- Player get a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if game is lost
- Let Player choose to play again
*/

// Game Values
let min = 15,
	max = 20,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// Get UI elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessInput = document.querySelector('#guess-input'),
	guessBtn = document.querySelector('#guess-btn'),
	message = document.querySelector('.message');

// Assign min and max numbers to UI
minNum.textContent = min;
maxNum.textContent = max;

// Add even when play again is clicked
game.addEventListener('mousedown', function(e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Add event when button is clicked
guessBtn.addEventListener('click', function() {
	// Get users guess
	let guess = parseInt(guessInput.value);

	// Check the guess is a valid number
	if (isNaN(guess) || guess < min || guess > max) {
		// Display error message
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
		return;
	}

	// Check if won
	if (guess === winningNum) {
		// GAME OVER - Won
		gameOver(true, `${guess} is correct. YOU WIN!`);
	} else {
		// Wrong number
		guessesLeft -= 1;

		// Check if lost
		if (guessesLeft === 0) {
			// GAME OVER - lost
			gameOver(false, `GAME OVER. You Lost. The number was ${winningNum}`);
		} else {
			// Apply red border
			guessInput.style.borderColor = 'red';
			// Show amount of guess left
			setMessage(`${guess} is incorrect. ${guessesLeft} guesses left.`, 'red');
			// Clear user guess
			guessInput.value = '';
		}
	}
});
// Displays message in color specified
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function getRandomNum(minNum, maxNum) {
	return Math.floor(Math.random() * (maxNum - minNum + 1) + min);
}

function gameOver(isWon, msg) {
	let color;
	// Assign color based on isWon
	isWon === true ? (color = 'green') : (color = 'red');

	// Disable the input
	guessInput.disabled = true;
	// Apply green border
	guessInput.style.borderColor = color;
	// Show winning message
	setMessage(msg, color);
	// Ask user to play again
	guessBtn.value = 'Play again?';
	// Add play again class to guessBtn
	guessBtn.className += 'play-again';
}
