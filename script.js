"strict";

// Elements
const btnPlay = document.querySelector(".btn-play");
const btnBack = document.querySelector(".header__btn-back");
const btnReset = document.querySelector(".header__btn-reset");
const gameMessage = document.querySelector(".game__message");
const gameNumber = document.querySelector(".game__number");
const guessInputSpace = document.querySelector(".game__guess-input-space");
const btnCheck = document.querySelector(".game__btn-check");
const btnClear = document.querySelector(".game__btn-clear");
const hearts = document.querySelectorAll(".game__life-span .fa-heart");
const homePage = document.getElementById("homePage");
const gamePage = document.getElementById("gamePage");

// Show the game page and hide the home page
btnPlay.addEventListener("click", function () {
  homePage.classList.remove("active");
  gamePage.classList.add("active");
});

// Initial Game State
let playingGame = true;
let secretNumber = Math.trunc(Math.random() * 10) + 1;
let remainingLives = hearts.length;

console.log(`Secret Number: ${secretNumber}`); //! For debugging purposes

// Match Guess Function
const matchGuess = function () {
  if (!playingGame) return;

  let userGuess = +guessInputSpace.value;

  // Check if input is valid
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    gameMessage.textContent =
      "Your guess must be a number between 1 and 10. 😞";
    return;
  }

  // Correct guess
  if (userGuess === secretNumber) {
    document.body.style.background =
      "linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)";
    gameMessage.style.background = "#6ea968cf";
    gameMessage.textContent = "Congratulations! You guessed correctly.";
    gameNumber.textContent = secretNumber;
    playingGame = false;
  } else {
    // Incorrect guess
    gameMessage.textContent =
      userGuess > secretNumber
        ? "Too high! Try guessing a lower number. 🔻"
        : "Too low! Try guessing a higher number. 🔺";

    if (remainingLives > 1) {
      const heartToBreak = hearts[remainingLives - 1];
      heartToBreak.classList.remove("fa-heart");
      heartToBreak.classList.add("fa-heart-crack");
      heartToBreak.style.color = "#343434";
    } else if (remainingLives === 1) {
      hearts[0].classList.remove("fa-heart");
      hearts[0].classList.add("fa-heart-crack");
      hearts[0].style.color = "#343434";
      gameMessage.textContent = `Out of guesses! The secret number was ${secretNumber}. Try again! 😞`;
      playingGame = false;
      document.body.style.background = "#cc2f2f";
      gameMessage.style.background = "#cc2f2f";
    }

    remainingLives--;
    console.log(`Remaining lives: ${remainingLives}`); //! For debugging purposes
  }
};

// Go back to the home page
btnBack.addEventListener("click", function () {
  gamePage.classList.remove("active");
  homePage.classList.add("active");
});

// Reset Button to Reset Hearts and Game State
btnReset.addEventListener("click", function () {
  guessInputSpace.value = "";
  gameNumber.textContent = "?";
  document.body.style.background =
    "linear-gradient(to bottom, #104f97, #131314)";
  gameMessage.style.background = "#284463";
  gameMessage.textContent =
    "I am thinking of a number between 1 to 10. Now guess the number.";

  // Reset all hearts to full hearts
  hearts.forEach((heart) => {
    heart.classList.remove("fa-heart-crack");
    heart.classList.add("fa-heart");
    heart.style.color = "#ff0000";
  });

  // Reset the game state
  secretNumber = Math.trunc(Math.random() * 10) + 1;
  remainingLives = hearts.length; // Reset lives
  playingGame = true;
  console.log("New secret number:", secretNumber); //! For debugging purposes
});

// Add Event Listeners for Check and Clear
btnCheck.addEventListener("click", matchGuess);

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    matchGuess();
  }
});

btnClear.addEventListener("click", function () {
  guessInputSpace.value = "";
});
