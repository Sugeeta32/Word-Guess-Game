
// Array of words the computer will generate for the game.
var words = ["crash", "hardware", "byte", "download", "virus", "hacker", "bug", "bandwidth", "cloud", "malware", "cookies"];

// Creating the currentWord variable which holds the randomly selected word.
var currentWord = '';
// Array for the dashes that holds the correct letters.
var answer = [];
// var to hold wins initial value.
var wins = 0;
// Array to hold the users guess. Whatever the user clicks goes into guessedLetters.
var guessedLetters = [];
// variable to hold the guess charecter clicked each time.
var userGuess = '';
// variable to hold guesses remaining.
var guessesRemaining = 10;
var isWin = false;

/** When the user clicks "play" the game picks a word and populates the number of lines
corresponding to the number of letters in the chosen word. This is a placeholder for the random word **/

function pickAWord() {
  //a random word is picked from Words array and assigned to the variable currentWord
  currentWord = words[1+ Math.floor(Math.random() * words.length)];
  //This line puts the number of guesses on the div element called "Guesses"
  document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;

  // This block is creating placeholder '-' for the random word upto the size of currentWord
  for (var i = 0; i < currentWord.length; i++) {
    answer[i] = "_";
    document.getElementById("blanks").innerHTML = answer;
   // console.log(answer);
    // replacing the commas from in between the lines in the answer array by spacer using arrays join function.
    var remove = document.getElementById("blanks");
    remove.innerHTML = answer.join(" ");
  }
};

/**  Function that takes the users guess and pushes that letter to the guessedLetters array.*/

function pickALetter(letter) {
  // move letter to correct space.
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
    userGuess = guessedLetters[guessedLetters.length - 1];
  }

  // For loop that takes in the users guess and compares it to the current word's letters at each Index number.
  // If the letter they clicked (guessedLetters index) is equal to the currentWord's index then the program replaces the blank spaces with that letter.
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
    //var audio = new Audio("/images/crash.mp3");
    //audio.play();
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    isWin = true;
    playAudio();
    setTimeout(function() {
      alert("YOU WIN!");
      reset();
      
    },2);
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
 //wins = 0;
 guessedLetters = [];
 userGuess = '';
 guessesRemaining = 10;
 isWin = false;
 document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
 document.getElementById("wins").innerHTML = "Wins: " + wins;
 document.getElementById("blanks").innerHTML = answer;
}
function playAudio() { 
  document.getElementById("myAudio").play(); 
} 
