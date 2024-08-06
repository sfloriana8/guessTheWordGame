const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgain = document.querySelector(".play-again");

const word = "magnolia";

//empty array that lists the guessed letters in the game
const guessedLetters = [];
let remainingGuesses = 8;

//adding a placeholder for each letter
const placeholder = function(word){
   const placeholderLetters = [];
   for (const letter of word){
       console.log(letter);
       placeholderLetters.push("●");
   }
   wordInProgress.innerText = placeholderLetters.join("");
};
 

placeholder(word);

 //adding an eventListener for the button
 guessLetterButton.addEventListener("click", function(e){
    e.preventDefault();
    message.innerText = "";
const guess = letterInput.value;
const goodGuess = validateInput(guess);
if (goodGuess){
    makeGuess(guess);
}

letterInput.value= "";
 });

 // checks for player's input

 const validateInput = function (input){
     const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1){
        message.innerText = "Please only enter 1 letter";
    } else if (!input.match(acceptedLetter)){
        message.innerText = "Please only type a letter, not a number or special character";
    } else {
        return input;
    }
    
 };
 //capturing Input

 const makeGuess = function(guess){
     guess = guess.toUpperCase();
     if (guessedLetters.includes(guess)){
         message.innerText = "Sorry you already used that letter";
         
     } else {
         guessedLetters.push(guess);
         console.log(guessedLetters);
         showGuessedLetters();
         updateGuessesRemaining(guess);
         updateWordInProgress(guessedLetters);
     }

 };

 //creating Function to show guessed letters 
const showGuessedLetters = function(){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters){
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
 
};

//updating the word in progress
const updateWordInProgress = function(guessedLetters){
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    for (const letter of wordArray){
    if (guessedLetters.includes(letter)){
        revealWord.push(letter.toUpperCase());
    } else {
        revealWord.push("●");
    }
    
}

wordInProgress.innerText = revealWord.join("");
checkIfWin();
};

//remaining guesses count 
const updateGuessesRemaining = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)){
        message.innerText = `Sorry the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Yes, the word includes ${guess}`;
    }
    if (remainingGuesses === 0){
        message.innerHTML = `You ran out of guesses! The word was <span class="highlight"> ${word}</span>.`;
    } else if (remainingGuesses ===1){
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
    
};


//Checking if the player won 
const checkIfWin = function(){
    if (word.toUpperCase() === wordInProgress.innerText){
        message.classList.add("win");
        message.innerHTML= `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};

//Number of Remaining Guesses


