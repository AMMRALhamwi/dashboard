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
// if (musicStatus == true) {
//   music.play();
// }
// Start music when the game starts (assuming this code runs after game initialization):
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
let countDownDate = new Date().getTime();
console.log(countDownDate);
