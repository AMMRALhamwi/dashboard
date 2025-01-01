// sellect html elements
let page = document.querySelector(".page");
let startGame = document.querySelector(".control-buttons span");
let playerName = document.querySelector(".name span");
let controlButtons = document.querySelector(".control-buttons");
let BlocksContainer = document.querySelector(".memory-game-blockes");
let Blocks = document.querySelectorAll(".memory-game-blockes .game-block");
let triesElement = document.querySelector(".tries span");
let displayMode = document.querySelector(".display-mode");
let musicButton = document.querySelector(".music");
let musicSpan = document.querySelector(".music span");
let soundsEffectsButton = document.querySelector(".sounds-effects ");
let soundsEffectsSpan = document.querySelector(".sounds-effects span");
let music = document.querySelector("#onPlay");
// variables for quick settings
let displayModeClicked = 0;
let soundsEffectsClicked = 0;
let soundEffectsStats = true;
let musicbuttonClicks = 0;
let musicStatus = true;
// display modes

displayMode.onclick = function () {
  displayModeClicked++;

  if (displayModeClicked % 2 !== 0) {
    page.style.backgroundColor = "black";
    document.querySelector(".display-mode span").innerHTML = "Light";
  } else {
    page.style.backgroundColor = "#fff";
    document.querySelector(".display-mode span").innerHTML = "Dark";
  }
};
// music mode

music.play();

musicButton.onclick = function () {
  musicbuttonClicks++;
  if (musicStatus) {
    music.pause();
    musicSpan.innerHTML = "Off";
    musicStatus = false;
  } else {
    music.play();
    musicSpan.innerHTML = "On";
    musicStatus = true;
  }
};

// sound effects modes
soundsEffectsButton.onclick = function () {
  soundsEffectsClicked++;
  if (soundsEffectsClicked % 2 !== 0) {
    soundsEffectsSpan.innerHTML = "Off";
    soundEffectsStats = false;
  } else {
    soundsEffectsSpan.innerHTML = "On";
    soundEffectsStats = true;
  }
};
startGame.onclick = function () {
  let yourName = prompt("What's your name ?");
  if (yourName == null || yourName == "") {
    playerName.innerHTML = "name Unknown";
  } else {
    playerName.innerHTML = yourName;
  }
  controlButtons.remove();
  blocks.forEach((block) => {
    block.classList.add("is-flipped");

    setTimeout(function () {
      block.classList.remove("is-flipped");
    }, 1500);
  });
};
// flipping all blocks to start

// main variables
let durantion = 1000;
let blocks = Array.from(BlocksContainer.children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

// add order css property to game blocks
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    filpBlock(block);
  });
});

// match function
function checkMatchedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    console.log("good");
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    if (soundEffectsStats == true) {
      document.getElementById("succes").play();
    }
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, durantion);
    if (soundEffectsStats == true) {
      document.getElementById("fail").play();
    }
  }
}

// shuffle function
function shuffle(array) {
  // setting varibals
  let current = array.length,
    temp,
    random;
  while (current > 0) {
    // get random number
    random = Math.floor(Math.random() * current);
    // decrrrease length by one
    current--;
    //[1] save current element in stash
    temp = array[current];
    //[2] current element  = random element
    array[current] = array[random];
    //[3] random element = get element from stash
    array[random] = temp;
  }
  return array;
}

// flip block function
function filpBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  // collect all flipped cards
  let allFlippedBlocks = blocks.filter((flipedBlock) =>
    flipedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    console.log("dur");

    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  BlocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    // remove the class no clicking after the duration
    BlocksContainer.classList.remove("no-clicking");
  }, durantion);
}

// the end of the countDown
let timerContainer = document.querySelector(".timer-container");
let minutesSpan = document.querySelector(".timer-container .minutes");
let secondsSpan = document.querySelector(".timer-container .seconds");
let countDownInterval;
// clearInterval();
function countDown(duration) {
  let countDownInterval; // Declare interval inside the function's scope

  countDownInterval = setInterval(function () {
    let minutes, seconds;
    duration--;

    if (duration < 0) {
      clearInterval(countDownInterval); // Stop the timer when duration is 0 or less
      timerContainer.innerHTML = "Time's up!"; // Or any other message you want
      endGame();
      return; // Exit the function
    }

    minutes = Math.floor(duration / 60);
    seconds = Math.floor(duration % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes; // Use "+" to concatenate strings
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerContainer.innerHTML = minutes + ":" + seconds; //Use "+" for concatenation
  }, 1000);
}

countDown(150); // Start the countdown

// End game
function endGame() {
  BlocksContainer.classList.add("no-clicking");

  // if all the game blockes has a class has match you win
  checkClassName(blocks, "has-match");
}

function checkClassName(elements, className) {
  let all = 0;

  for (i = 0; i < elements.length; i++) {
    // console.log(elements[i]);
    if (elements[i].classList.contains(className)) {
      console.log("has match");
      all++;
    } else {
      console.log("no");
    }
  }
  if (all === elements.length) {
    console("you nailed it");
    let overLay = document.createElement("div");
    overLay.className = "over-lay";
    let endGame = document.createElement("div");
    endGame.className = "end-game";
    let span = document.createElement("span");
    span.innerHTML = "You Won";
    let playAgain = document.createElement("button");
    playAgain.innerHTML = "Play Again";
    playAgain.className = "play-again";

    endGame.appendChild(span);
    endGame.appendChild(playAgain);
    overLay.appendChild(endGame);
    page.appendChild(overLay);
    playAgain.addEventListener("click", () => {
      location.reload();
    });
  } else if (all !== elements.length) {
    console.log(all);
    let overLay = document.createElement("div");
    overLay.className = "over-lay";
    let endGame = document.createElement("div");
    endGame.className = "end-game";
    let span = document.createElement("span");
    span.innerHTML = "You lost";
    let playAgain = document.createElement("button");
    playAgain.innerHTML = "Play Again";
    playAgain.className = "play-again";
    endGame.appendChild(span);
    endGame.appendChild(playAgain);
    overLay.appendChild(endGame);
    page.appendChild(overLay);
    playAgain.addEventListener("click", () => {
      location.reload();
    });
  }
}
