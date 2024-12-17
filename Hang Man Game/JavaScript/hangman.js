// welcome popup
let welcomePopup = document.querySelector(".welcome-popup");
let enterGameButton = document.querySelector(".welcome-popup .enter-game");

enterGameButton.onclick = function () {
  welcomePopup.style.display = "none";
};
// Letters
const letters = "qwertyuiopasdfghjklzxcvbnm";
// get array from letters
let lettersArray = Array.from(letters);
// console.log(arrayLetters);

// winning counter
let win = 0;

// select letters container

let lettersContainer = document.querySelector(".letters");

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
  movies: ["interstellar", "avengers", "hulk", "home alone", "iron man"],
  people: ["albert Einstein", "mahatma gandhi", "lana almouhamad", "robert"],
  countries: ["Iraq", "Syria", "Canada", "UAE", "USA", "KSA"],
  animals: ["elephant", "tiger", "zebra", "giraffe", "monkeys", "penguin"],
  fruits: ["apple", "banana", "strawberry", "watermelon", "kiwi", "pineapple"],
  colors: ["red", "blue", "green", "yellow", "purple", "orange"],
  professions: ["doctor", "teacher", "engineer", "artist", "chef", "pilot"],
  sports: [
    "football",
    "basketball",
    "tennis",
    "swimming",
    "volleyball",
    "golf",
  ],
  carBrands: ["toyota", "honda", "ford", "bmw", "mercedes", "audi"],
  countries2: ["Japan", "Germany", "Brazil", "Russia", "India", "France"],
  planets: ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn"],
  bodyParts: ["head", "shoulder", "knee", "toes", "elbow", "feet"],
  drinks: ["coffee", "tea", "juice", "soda", "water", "milk"],
  desserts: ["cake", "ice cream", "cookies", "pie", "pudding", "brownies"],
  languages: ["English", "Spanish", "French", "Chinese", "Arabic", "Russian"],
  musicalInstruments: [
    "piano",
    "guitar",
    "violin",
    "drums",
    "flute",
    "trumpet",
  ],
  flowers: ["rose", "lily", "sunflower", "daisy", "tulip", "orchid"],
  clothing: ["shirt", "pants", "dress", "shoes", "hat", "jacket"],
  cities: ["Paris", "Tokyo", "New York", "London", "Dubai", "Sydney"],
  countries3: [
    "Italy",
    "Mexico",
    "South Africa",
    "South Korea",
    "Egypt",
    "Argentina",
  ],
  mountains: [
    "Everest",
    "Kilimanjaro",
    "Denali",
    "Mont Blanc",
    "Andes",
    "Himalayas",
  ],
  oceans: ["Pacific", "Atlantic", "Indian", "Arctic", "Southern", "Antarctic"],
  breakfastFoods: ["pancakes", "eggs", "cereal", "toast", "bacon", "muffin"],
  animals2: ["lion", "bear", "elephant", "zebra", "rhinoceros", "hippopotamus"],
  desserts2: [
    "cupcake",
    "macaron",
    "cheesecake",
    "chocolate",
    "gelato",
    "tiramisu",
  ],
  sports2: ["soccer", "baseball", "hockey", "gymnastics", "skiing", "surfing"],
  carModels: ["Civic", "Accord", "Camry", "Corolla", "Mustang", "Camaro"],
  superheroes: [
    "Superman",
    "Batman",
    "Spiderman",
    "Wonder Woman",
    "Ironman",
    "Captain America",
  ],
  furniture: ["sofa", "table", "chair", "bed", "desk", "cabinet"],
  emotions: ["happy", "sad", "angry", "excited", "surprised", "confused"],
  reptiles: ["snake", "turtle", "lizard", "alligator", "iguana", "chameleon"],
  vegetables: [
    "carrot",
    "broccoli",
    "tomato",
    "cucumber",
    "potato",
    "bell pepper",
  ],
  snacks: ["chips", "popcorn", "pretzels", "nuts", "cookies", "crackers"],
  condiments: [
    "ketchup",
    "mustard",
    "mayonnaise",
    "salsa",
    "soy sauce",
    "ranch",
  ],
  pastas: [
    "spaghetti",
    "macaroni",
    "fettuccine",
    "penne",
    "lasagna",
    "linguine",
  ],
  landmarks: [
    "Eiffel Tower",
    "Great Wall of China",
    "Statue of Liberty",
    "Taj Mahal",
    "Machu Picchu",
    "Colosseum",
  ],
  tools: ["hammer", "screwdriver", "wrench", "saw", "drill", "pliers"],
  desserts3: ["brownie", "custard", "flan", "sorbet", "toffee", "truffle"],
  computerBrands: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer"],
  mammals: ["lion", "bear", "whale", "elephant", "cheetah", "gorilla"],
  occupations: [
    "doctor",
    "teacher",
    "lawyer",
    "firefighter",
    "police officer",
    "chef",
  ],
  boardGames: ["Monopoly", "Chess", "Scrabble", "Risk", "Catan", "Clue"],
  fruits2: ["pineapple", "mango", "kiwi", "papaya", "guava", "dragonfruit"],
  movieGenres: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Thriller"],
  musicalGenres: ["Pop", "Rock", "Hip-hop", "Jazz", "Country", "Classical"],
  countries4: [
    "Australia",
    "Norway",
    "Argentina",
    "Thailand",
    "Greece",
    "Netherlands",
  ],
  desserts4: [
    "macarons",
    "tiramisu",
    "panna cotta",
    "eclairs",
    "creme brulee",
    "mille-feuille",
  ],
  sports3: ["swimming", "cycling", "boxing", "surfing", "wrestling", "archery"],
  colors2: ["maroon", "teal", "cyan", "magenta", "indigo", "amber"],
  planets2: ["Neptune", "Uranus", "Pluto", "Mercury", "Venus", "Mars"],
  professions2: [
    "architect",
    "pilot",
    "chef",
    "firefighter",
    "photographer",
    "plumber",
  ],
  games: [
    "Tetris",
    "Minecraft",
    "Fortnite",
    "Overwatch",
    "League of Legends",
    "Dota 2",
  ],
  constellations: [
    "Orion",
    "Ursa Major",
    "Cassiopeia",
    "Leo",
    "Pegasus",
    "Cygnus",
  ],
  currencies: ["Dollar", "Euro", "Yen", "Pound", "Rupee", "Dinar"],
  desserts5: [
    "macaroons",
    "crepes",
    "churros",
    "gelato",
    "profiteroles",
    "sorbet",
  ],
  dances: ["Salsa", "Ballet", "Hip-hop", "Tango", "Breakdance", "Flamenco"],
  cocktails: [
    "Margarita",
    "Martini",
    "Mojito",
    "Cosmopolitan",
    "Pina Colada",
    "Bloody Mary",
  ],
  gemstones: ["Diamond", "Emerald", "Ruby", "Sapphire", "Topaz", "Amethyst"],
  constellations2: [
    "Aries",
    "Gemini",
    "Virgo",
    "Scorpio",
    "Capricorn",
    "Pisces",
  ],
  condiments2: [
    "barbecue sauce",
    "sriracha",
    "tahini",
    "chutney",
    "hoisin sauce",
    "ponzu",
  ],
  accessories: [
    "earrings",
    "scarf",
    "sunglasses",
    "watch",
    "backpack",
    "umbrella",
  ],
  landmarks2: [
    "Big Ben",
    "Sydney Opera House",
    "Christ the Redeemer",
    "Petra",
    "Golden Gate Bridge",
    "Acropolis",
  ],
  cuisines: ["Italian", "Mexican", "Indian", "Chinese", "Thai", "French"],
  beverages: ["Latte", "Espresso", "Cappuccino", "Chai", "Matcha", "Americano"],
  holidays: [
    "Christmas",
    "Halloween",
    "Thanksgiving",
    "Independence Day",
    "Easter",
    "New Year's",
  ],
  superheroes2: [
    "Wonder Woman",
    "Superman",
    "Spiderman",
    "Black Widow",
    "Thor",
    "Black Panther",
  ],
  desserts6: [
    "macadamia nuts",
    "bread pudding",
    "chocolate mousse",
    "banana split",
    "tart tatin",
    "red velvet cake",
  ],
  sports4: [
    "badminton",
    "table tennis",
    "ice hockey",
    "rugby",
    "golf",
    "bowling",
  ],
  carBrands2: ["Volkswagen", "Subaru", "Lexus", "Porsche", "Jeep", "Chrysler"],
  countries5: ["Brazil", "China", "Germany", "Italy", "Spain", "Mexico"],
  musicalInstruments2: [
    "cello",
    "harp",
    "accordion",
    "ukulele",
    "clarinet",
    "trombone",
  ],
  animals3: ["koala", "panda", "cheetah", "hedgehog", "meerkat", "penguin"],
  cocktails2: [
    "Negroni",
    "Daiquiri",
    "Black Russian",
    "Mai Tai",
    "Long Island Iced Tea",
    "White Russian",
  ],
  boardGames2: [
    "Pictionary",
    "Battleship",
    "Operation",
    "Twister",
    "Connect Four",
    "Guess Who",
  ],
  flowers2: [
    "daffodil",
    "hydrangea",
    "carnation",
    "hibiscus",
    "dahlia",
    "freesia",
  ],
  desserts7: [
    "macaroni and cheese",
    "key lime pie",
    "baked Alaska",
    "carrot cake",
    "fruit tart",
    "profiteroles",
  ],
  tools2: [
    "level",
    "tape measure",
    "screwdriver",
    "pliers",
    "wrench",
    "crowbar",
  ],
  languages2: [
    "German",
    "Japanese",
    "Portuguese",
    "Korean",
    "Dutch",
    "Swedish",
  ],
  professions3: [
    "veterinarian",
    "astronaut",
    "scientist",
    "actor",
    "dentist",
    "nurse",
  ],
  sweets: [
    "lollipop",
    "cotton candy",
    "toffee",
    "fudge",
    "caramel",
    "marshmallow",
  ],
  insects: [
    "spider",
    "beetle",
    "caterpillar",
    "butterfly",
    "ant",
    "grasshopper",
  ],
  movies2: [
    "The Shawshank Redemption",
    "The Godfather",
    "The Dark Knight",
    "Pulp Fiction",
    "Forrest Gump",
    "Fight Club",
  ],
  dogBreeds: [
    "Golden Retriever",
    "Labrador Retriever",
    "German Shepherd",
    "Bulldog",
    "Poodle",
    "Beagle",
  ],
  catBreeds: [
    "Siamese",
    "Persian",
    "Maine Coon",
    "Bengal",
    "Sphynx",
    "Ragdoll",
  ],
  birds: ["Robin", "Sparrow", "Hummingbird", "Owl", "Pelican", "Flamingo"],
  desserts8: [
    "gelato",
    "mocha",
    "churro",
    "fondue",
    "souffle",
    "crème caramel",
  ],
  seaCreatures: [
    "Dolphin",
    "Octopus",
    "Starfish",
    "Sea Turtle",
    "Jellyfish",
    "Shark",
  ],
  sports5: [
    "cricket",
    "volleyball",
    "badminton",
    "snowboarding",
    "wrestling",
    "karate",
  ],
  flowers3: ["tulip", "orchid", "lily", "sunflower", "rose", "daisy"],
  desserts9: [
    "tiramisu",
    "cannoli",
    "cheesecake",
    "strudel",
    "trifle",
    "macaroon",
  ],
  beverages2: [
    "smoothie",
    "iced tea",
    "lemonade",
    "hot chocolate",
    "margarita",
    "milkshake",
  ],
  vehicles: [
    "motorcycle",
    "helicopter",
    "yacht",
    "bulldozer",
    "tractor",
    "submarine",
  ],
  desserts10: ["croissant", "sorbet", "caramel", "custard", "scone", "truffle"],
  bookGenres: [
    "thriller",
    "romance",
    "mystery",
    "fantasy",
    "science fiction",
    "horror",
  ],
  insects2: [
    "butterfly",
    "dragonfly",
    "bee",
    "termite",
    "grasshopper",
    "cicada",
  ],
  shoeBrands: ["Nike", "Adidas", "Converse", "Vans", "Puma", "Reebok"],
  beverages3: [
    "chai tea",
    "matcha latte",
    "caramel macchiato",
    "green tea",
    "lemon water",
    "chai latte",
  ],
  hotelChains: [
    "Marriott",
    "Hilton",
    "Hyatt",
    "Sheraton",
    "Holiday Inn",
    "Radisson",
  ],
  vehicles2: [
    "convertible",
    "minivan",
    "pickup truck",
    "limousine",
    "scooter",
    "RV",
  ],
  makeupBrands: [
    "MAC",
    "Maybelline",
    "NARS",
    "Urban Decay",
    "L'Oréal",
    "Bobbi Brown",
  ],
  desserts11: ["eclair", "cannoli", "souffle", "tart", "macaron", "pavlova"],
  animals4: [
    "cheetah",
    "gorilla",
    "elephant",
    "giraffe",
    "hippopotamus",
    "rhinoceros",
  ],
  professions4: [
    "plumber",
    "electrician",
    "mechanic",
    "chef",
    "barista",
    "gardener",
  ],
  carModels2: ["Civic", "Corolla", "Mustang", "Camry", "Cruze", "Jetta"],
  fruits3: ["mango", "papaya", "guava", "kiwi", "dragonfruit", "persimmon"],
  drinks2: [
    "smoothie",
    "mimosa",
    "sangria",
    "mojito",
    "margarita",
    "gin and tonic",
  ],
  sports6: ["tennis", "soccer", "golf", "swimming", "boxing", "cycling"],
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
            span.classList.add("correct");
            win++;
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
    if (win == guessSpans.length) {
      winGame();
    }
  }
});

// winning the game
function winGame() {
  // create popup div
  let div = document.createElement("div");
  // create text
  let divText = document.createTextNode(`Awesome You Won `);
  // append text to div
  div.appendChild(divText);
  // add class to div
  div.className = "win-popup";

  // append body
  document.body.appendChild(div);
}
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
  div.className = "lose-popup";

  // append body
  document.body.appendChild(div);
}
