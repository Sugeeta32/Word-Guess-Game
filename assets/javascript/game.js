
// Array of words the computer will generate for the game.
var words = ["crash", "hardware", "byte", "download", "virus", "hacker", "bug", "bandwidth", "cloud", "malware", "cookies"];

// Creating the currentWord variable which holds the randomly selected word.
var currentWord = '';
// Array for the dashes that holds the correct letters.
var answer = [];
// var to hold wins initial value.
var wins = 0;
// Array to hold the users guess. Whatever the user clicks goes into holdWord.
var holdWord = [];
// variable to hold the guess.
var userGuess = '';
// variable to hold guesses remaining.
var guessesRemaining = 10;
var isWin = false;
// When the user clicks "play" the game picks a word and populates the number of lines
//corresponding to the number of letters in the chosen word. This is a placeholder for the random word
function pickAWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
  for (var i = 0; i < currentWord.length; i++) {
    answer[i] = "_";
    document.getElementById("blanks").innerHTML = answer;
    console.log(answer);
    // replacing the commas from in between the lines in the anser array by spacer .
    var remove = document.getElementById("blanks");
    remove.innerHTML = answer.join(" ");
  }
};

// Function that takes the users guess and pushes that letter to the holdWord array.
function pickALetter(letter) {
  // move letter to correct space.
  if (!holdWord.includes(letter)) {
    holdWord.push(letter);
    userGuess = holdWord[holdWord.length - 1];
  }

  // For loop that takes in the users guess and compares it to the current word's letters at each Index number.
  // If the letter they clicked (holdWord index) is equal to the currentWord's index then the program replaces the blank spaces with that letter.
  for (var j = 0; j < currentWord.length; j++) {
    if (userGuess === currentWord.charAt(j)) {
      answer[j] = userGuess;
      document.getElementById("blanks").innerHTML = answer;
      // removing the commas from in between the letters.
      var remove = document.getElementById("blanks");
      remove.innerHTML = answer.join(" ");

      // check if the user has won.
      calculateWin();
    }
  }
  if(!isWin && !answer.includes(userGuess) ){
    calculateGuessesRemaining();
  }
  if(!isWin && guessesRemaining === 0) {
    gameOver();
  }
};

//this function calculate win
function calculateWin() {
  if (!answer.includes("_") && guessesRemaining > 0) {
    wins++;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    isWin = true;
    setTimeout(function() {
      reset();
      alert("YOU WIN!");
    //   var audio = new Audio('audio_file.mp3');
    // audio.play();
    }, 10);
  }
}
// this function  determines if guess remaining
function calculateGuessesRemaining(){
  if(guessesRemaining >=1 ) {
    guessesRemaining = (guessesRemaining - 1);
    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
  }
}


function gameOver() {
    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
    reset();
    setTimeout(function() {
      alert("YOU Loose!")
    }, 10);
    return;
}

function reset() {
 currentWord = '';
 answer = [];
//  wins = 0;
 holdWord = [];
 userGuess = '';
 guessesRemaining = 10;
 isWin = false;
 document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
//  document.getElementById("wins").innerHTML = "Wins: " + wins;
 document.getElementById("blanks").innerHTML = answer;
}
