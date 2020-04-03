/*
GAME FUNCTION
- Player must guess a number between min and max
- Player get a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if game is lost
- Let Player choose to play again
*/

// Game Values
let min = 1,
	max = 10,
	winningNum = 2,
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

// Add event when button is clicked
guessBtn.addEventListener('click', function() {
	// Get users guess
	let guess = parseInt(guessInput.value);
	// Check the guess is a valid number
	if (isNaN(guess) || guess < min || guess > max) {
		// Display error message
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
		// Clear user guess
		guessInput.value = '';
	}

	// Check if won
	if (guess === winningNum) {
		// Disable the input
		guessInput.disabled = true;
		// Apply green border
		guessInput.style.borderColor = 'green';
		// Show winning message
		setMessage(`${guess} is correct. YOU WIN!`, 'green');
	} else {
		guessesLeft -= 1;

		// Game over - lost
		if (guessesLeft === 0) {
			// Disable the input
			guessInput.disabled = true;
			// Apply red border
			guessInput.style.borderColor = 'red';
			// Show losing message
			setMessage(`GAME OVER. You Lost. The number was ${winningNum}`, 'red');
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

function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
