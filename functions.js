// hangman.js
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('guess-input');
    const output = document.getElementById('masked-word');
    const guessesRemainingDisplay = document.getElementById('guesses-remaining');
    const incorrectGuessesDisplay = document.getElementById('incorrect-guesses');
    const hangmanDrawing = document.getElementById('hangman-drawing');
    const guessForm = document.getElementById('guess-form');

    let guessesRemaining = 6;
    let incorrectGuesses = [];
    let randomizedWord = '';
    let maskedWord = '';

    // Initialize game
    newGame();

    function newGame() {
        guessesRemaining = 6;
        incorrectGuesses = [];
        updateGuessesRemaining();
        updateIncorrectGuessesDisplay();
        const randomIndex = Math.floor(Math.random() * words.length);
        randomizedWord = words[randomIndex];
        maskedWord = "*".repeat(randomizedWord.length);
        output.textContent = maskedWord;
        hangmanDrawing.textContent = ''; // Clear previous hangman drawing
        input.disabled = false;
        input.focus();
    }

    function updateGuessesRemaining() {
        guessesRemainingDisplay.textContent = guessesRemaining;
    }

    function updateIncorrectGuessesDisplay() {
        incorrectGuessesDisplay.textContent = incorrectGuesses.join(', ');
    }

    function replaceFoundChars(guess) {
        for (let i = 0; i < randomizedWord.length; i++) {
            const char = randomizedWord[i];
            if (char === guess) {
                maskedWord = maskedWord.substring(0, i) + guess + maskedWord.substring(i + 1);
            }
        }
        output.textContent = maskedWord;
    }

    function win() {
        alert(`You have guessed right, the word is ${randomizedWord}.`);
        newGame();
    }

    function lose() {
        alert(`You've run out of guesses! The word was ${randomizedWord}.`);
        newGame();
    }

    guessForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const guess = input.value.trim().toLowerCase();
        if (!guess) return; // Don't process empty guesses
        if (randomizedWord.toLowerCase() === guess) {
            win();
        } else if (guess.length === 1) {
            if (randomizedWord.includes(guess)) {
                replaceFoundChars(guess);
                if (maskedWord === randomizedWord) {
                    win();
                }
            } else {
                incorrectGuesses.push(guess);
                updateIncorrectGuessesDisplay();
                guessesRemaining--;
                updateGuessesRemaining();
                // Add hangman drawing logic here
                if (guessesRemaining === 0) {
                    lose();
                }
            }
        } else {
            alert("Please enter only one letter or guess the whole word.");
        }
        input.value = '';
    });
});
