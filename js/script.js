const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");
let word = "magnolia";
const guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    update(word);
};

const update = function (word) {
    const updateLetters = [];
    for (const letter of word) {
        // console.log(letter);
        updateLetters.push("●");
    }
    inProgress.innerText = updateLetters.join("");
};

getWord();

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
        remainedGuess(guess);
        updateGuessedLetter();
        updateWord(guessedLetters);
    }
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

const remainedGuess = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Oh no, the letter has no ${guess}!`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yay! The word has the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Oh, shoot! Game over. The word was <span class="highlight">${word}</span>`;
    } else if (remainingGuesses === 1) {
        span.innerText = `${remainingGuesses} guess left`;
    } else {
        span.innerText = `${remainingGuesses} left`;
    }
};

const winnerGuess = function () {
    if (word.toUpperCase() === inProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word correct! Congrats!</p>`;
    }
};