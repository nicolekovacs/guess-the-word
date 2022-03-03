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
    updateGuessedLetter();
    updateWord(guessedLetters);
};

const updateGuessedLetter = function () {
    guessedList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedList.append(li);
    }
};

const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const reveal = [];
    for (const letter of wordArray) {
    if (guessedLetters.includes(letter)) {
        reveal.push(letter.toUpperCase());
    } else {
        reveal.push("●");
    }
}
    inProgress.innerText = reveal.join("");
    winnerGuess();
};

const winnerGuess = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correct! Congrats!</p>`;
    }
};