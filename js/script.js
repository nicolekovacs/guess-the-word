const guessedList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const inProgress = document.querySelector(".word-in-progress");
const remaining = document.querySelector(".remaining");
const span = document.querySelector("span");
const message = document.querySelector(".message");
const againButton = document.querySelector(".play-again");
const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = ""; 
});