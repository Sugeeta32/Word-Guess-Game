
// Array of words the computer will generate for the game.
var words = ["crash", "hardware", "byte", "download", "virus", "hacker", "bug", "bandwidth", "cloud", "malware", "cookies", "cache", "event", "interface", "clipboard", "configure", "hyperlink", "mouse", "processor"];

// Creating the currentWord variable which holds the randomly selected word.
var currentWord = '';//selected word
// Array for the dashes that holds the correct letters.
var answer = []; //letters in word

// variable for the guessed letter clicked each time.
var letter = '';
//Guessed Letters that did not match the current word
var unmatchedLetters = [];

// var to hold wins count.
var wins = 0;
// variable to hold guesses remaining. Initial value 10
var guessesRemaining = 10;
//user has not won yet
var isWin = false;

//hide alphabets initially
$("#alphabet").hide();


/** When the user clicks "Play" button, pickAWord function is called. The game picks a word and populates the number of lines
corresponding to the number of letters in the chosen word. This is a placeholder for the random word **/

function pickAWord() {

  $("#alphabet").show();
  /**This line puts the number of guesses on the div element called "Guesses"**/
  document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;

  /**a random word is picked from Words array and assigned to the variable currentWord**/
  var randWord = Math.floor(Math.random() * words.length) + 1;
  //pick word randomly from the words array. randNum holds random number.
  //words[randNum] gives word at the index of randNum
  currentWord = words[randWord];

  /** This block is creating placeholder '-' for the random word upto the size of currentWord **/
  for (var i = 0; i < currentWord.length; i++) {
    answer[i] = "_";
    document.getElementById("blanks").innerHTML = answer;
    // console.log(answer);
    /** replacing the commas from in between the lines in the answer array by spacer using arrays join function. **/
    document.getElementById("blanks").innerHTML = answer.join(" ");

  }
};

/**  Function that takes the users guess and pushes that letter to the guessedLetters array.*/
function pickALetter(letter) {
  setLetters(letter);

  if (!isWin && !answer.includes(letter)) {
    calculateGuessesRemaining();
  }
  if (!isWin && guessesRemaining === 0) {
    gameOver();
  }

};
//sets letter on anwer aray if found in the word. 
//It also sets the letter on unmatchedLetters array if answer array does not have the letter
function setLetters(letter) {
  if (!unmatchedLetters.includes(letter) && !answer.includes(letter)) {
    for (var j = 0; j < currentWord.length; j++) {
      if (currentWord.charAt(j) === letter) {
        answer[j] = letter;
        document.getElementById("blanks").innerHTML = answer.join(" ");
        // check if the user has won.
        calculateWin();
      }
    }
    if (!answer.includes(letter)) {
      unmatchedLetters.push(letter);
      document.getElementById("unmatched-guessed-letters").innerHTML = "Unmatched Guessed letters :" + " " + unmatchedLetters;
    }
  }
}
//this function calculate win
function calculateWin() {
  if (!answer.includes("_") && guessesRemaining > 0) {
    wins++;
    document.getElementById("wins").innerHTML = "Wins: " + wins;
    isWin = true;
    playAudio();
    setTimeout(function () {
      alert("YOU WIN!");
      reset();
    }, 2);

  }
}
// this function  determines if guess remaining
function calculateGuessesRemaining() {
  if (guessesRemaining >= 1) {
    guessesRemaining = (guessesRemaining - 1);
    document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
  }
}
function gameOver() {
  document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
  reset();
  setTimeout(function () {
    alert("YOU Loose!")
  }, 10);
  return;
}

function reset() {
  $("#alphabet").hide();
  currentWord = '';
  answer = [];
  unmatchedLetters = [];
  letter = '';
  guessesRemaining = 10;
  isWin = false;
  document.getElementById("guesses").innerHTML = "Guesses Remaining: " + guessesRemaining;
  document.getElementById("wins").innerHTML = "Wins: " + wins;
  document.getElementById("blanks").innerHTML = answer;
  document.getElementById("unmatched-guessed-letters").innerHTML = "";
}

function playAudio() {
  document.getElementById("myAudio").play();
}


