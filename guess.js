// Game state variables
let secretNumber;
let attempts;

// Game initialization function
function playGame() {
    const gameArea = document.getElementById('game-area');
    gameArea.innerHTML = `
        <input type="number" 
               id="guess" 
               placeholder="Enter your guess (1-100)"
               min="1"
               max="100">
        <button onclick="checkGuess()" class="pirate-btn">Submit Guess</button>
        <p id="message"></p>
    `;
    
    // Initialize game state
    secretNumber = generateRandomNumber(1, 100);
    attempts = 0;
    
    // Add event listener for Enter key
    document.getElementById('guess').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkGuess();
        }
    });
}

// Generate random number between min and max
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Check the player's guess
function checkGuess() {
    const guessInput = document.getElementById('guess');
    const message = document.getElementById('message');
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (!isValidGuess(guess)) {
        displayMessage("Please enter a valid number between 1 and 100!", "error");
        return;
    }

    attempts++;
    
    // Check guess against secret number
    if (guess === secretNumber) {
        handleCorrectGuess();
    } else {
        handleIncorrectGuess(guess);
    }
    
    // Clear input for next guess
    guessInput.value = '';
    guessInput.focus();
}

// Validate the guess
function isValidGuess(guess) {
    return !isNaN(guess) && guess >= 1 && guess <= 100;
}

// Handle correct guess
function handleCorrectGuess() {
    const gameArea = document.getElementById('game-area');
    const message = document.getElementById('message');
    
    displayMessage(`Congratulations! You found the One Piece in ${attempts} attempts!`, "success");
    message.classList.add('celebration');
    
    // Add replay button
    gameArea.innerHTML += `
        <button onclick="playGame()" class="pirate-btn">Play Again</button>
    `;
}

// Handle incorrect guess
function handleIncorrectGuess(guess) {
    const hint = guess < secretNumber 
        ? "Guess Higher! The One Piece is further ahead!"
        : "Guess Lower! The One Piece is back there!";
    
    displayMessage(hint, "error");
}

// Display message with appropriate styling
function displayMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.style.color = type === "success" ? "green" : "red";
}
