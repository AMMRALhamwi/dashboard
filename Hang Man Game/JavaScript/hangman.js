console.log("from the main js file");
// Letters
const letters = "qwertyuiopasdfghjklzxcvbnm";
// get array from letters
let lettersArray = Array.from(letters);
// console.log(arrayLetters);

// select letters container

let lettersContainer = document.querySelector(".letters");
console.log(lettersContainer);

// genrate letters
lettersArray.forEach((letter) => {
  // creat a span
  let span = document.createElement("span");
  // create letter text node

  let theLetter = document.createTextNode(letter);
  // appending the letter to span
  span.appendChild(theLetter);

  // add class to span
  span.className = "letter-box";

  // append span to letters container

  lettersContainer.appendChild(span);
});

// object of words and categories
const words = {
  programming: ["php", "java", "javaScript", "msql", "python", "c++", "html"],
  movies: ["inerstellar", "avengers", "hulk", "home alone", "iron man"],
  people: ["albert Einstein", "mahatma ghandi", "lana almouhamad", "ropert"],
  countries: ["Araq", "Syria", "Canada", "UAE", "USA", "kSA"],
};
// get randomm property
let allKeys = Object.keys(words);
// random number depend on keys length
let randommPropertyNumber = Math.floor(Math.random() * allKeys.length);
// caregory
let randomPropertyName = allKeys[randommPropertyNumber];
// category words
let randomPropertyValue = words[randomPropertyName];
// random number depends on words
let randommValueNumber = Math.floor(Math.random() * randomPropertyValue.length);
console.log(randommValueNumber);

// the  chosen word
let randomValueValue = randomPropertyValue[randommValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML =
  randomPropertyName;

// select letters guess container
let lettersGuessContainer = document.querySelector(".letters-guess");
// convert chosen word into array
let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);
// creat spans depens on word
lettersAndSpace.forEach((letter) => {
  // creat empty span
  let emptySpan = document.createElement("span");
  // if letter is a space
  if (letter === " ") {
    // add class to the span
    emptySpan.className = "with-space";
  }
  // append spans to letter guess container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// set wrong attempts

let wrongAttempts = 0;

// sellect draw element

let theDraw = document.querySelector(".hangman-draw");

console.log(guessSpans);
// hadleing the clicking onletters
document.addEventListener("click", (e) => {
  // set the chose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // get the clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    console.log(theClickedLetter);
    // the chosen word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());

    theChosenWord.forEach((wordLetter, WordIndex) => {
      // if the clicked letter equal to one of the chosen word letter
      if (theClickedLetter == wordLetter) {
        // set status to correct
        theStatus = true;

        // loop on all guessSpans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // outside loop
    console.log(theStatus);
    // if the letter is wrong
    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;
      // add class wrong on the draw elements
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // play fail sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
  }
});
// end game function
function endGame() {
  // create popup div
  let div = document.createElement("div");
  // create text
  let divText = document.createTextNode(
    `Game over The Word is ${randomValueValue}`
  );
  // append text to div
  div.appendChild(divText);
  // add class to div
  div.className = "popup";

  // append body
  document.body.appendChild(div);
}
