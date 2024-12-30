// sellect html elements
let startGame = document.querySelector(".control-buttons span");
let playerName = document.querySelector(".name span");
let controlButtons = document.querySelector(".control-buttons");
let BlocksContainer = document.querySelector(".memory-game-blockes");
let Blocks = document.querySelectorAll(".memory-game-blockes .game-block");
let triesElement = document.querySelector(".tries span");

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

    document.getElementById("succes").onplay;
  } else {
    triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, durantion);
    document.getElementById("fail").onplay;
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
