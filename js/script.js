const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");
const word = "magnolia";
const guessedLetters = [];

const update = function (word) {
    const updateLetters = [];
    for (const letter of word) {
        console.log(letter);
        updateLetters.push("●");
    }
    inProgress.innerText = updateLetters.join("");
};

update(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";
    const guess = letterInput.value;
    const goodGuess = inputValidator(guess);

    if (goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});

const inputValidator = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter!";
    } else if (input.length > 1 ) {
        message.innerText = "Please enter only one letter!";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please only enter letters!";
    } else {
        return input;
    }
};

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You have already guessed this letter. Please try another!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};