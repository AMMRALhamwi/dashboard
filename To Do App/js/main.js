// selecting the elements needed

let page = document.querySelector(".page");
let container = document.querySelector(".page ");
let form = document.querySelector(".page  .form");
let inputText = document.querySelector(".page  .form .input-text");
let newTaskSubmitButton = document.querySelector(".page  .form .new-task");
let tasksDiv = document.querySelector(".page  .tasks");
let runningTask = document.querySelector(".timer-area .running-task");

// empty array to store tasks
let arrayOfTasks = [];

//check if there any data in the local storage
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

// triger get data from local storage function
getDataFromLocaleStorage();
// Add new Task
newTaskSubmitButton.onclick = function () {
  if (inputText.value !== "") {
    addTaskToArray(inputText.value); // add task to array of tasks
    inputText.value = ""; // impty input feild
  }
};

// click on task element
tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    // remove element from local storage
    // document.setAttribute
    deletTaskWith(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    // remove element from page
    e.target.parentElement.parentElement.parentElement.remove();
    // console.log(e.target.parentElement.parentElement.parentElement);
  }
  // task element

  if (e.target.classList.contains("check")) {
    // toggle complaged task
    toggleStatusWith(
      e.target.parentElement.parentElement.parentElement.getAttribute("data-id")
    );
    // toggle class
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "checked"
    );
    if (
      e.target.parentElement.parentElement.parentElement.classList.contains(
        "checked"
      )
    ) {
      e.target.innerHTML = "uncheck";
    } else {
      e.target.innerHTML = "check";
    }
  }
});

// the function that adds the task to array
function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    checked: false,
    date: Date.now(),
  };
  // push the task to the arrayOfTasks
  arrayOfTasks.push(task);
  console.log(arrayOfTasks);
  // add tasks to page
  addElementsToPageFrom(arrayOfTasks);
  // add tasks to local storage
  addDataToLocalStorage(arrayOfTasks);
  // for testing
  // console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));
}
function addElementsToPageFrom(arrayOfTasks) {
  // empty the tasksDiv
  tasksDiv.innerHTML = "";
  // looping on arraryOfTasks
  arrayOfTasks.forEach((task) => {
    // creating the main div
    let taskContainer = document.createElement("div");
    taskContainer.className = "task";
    // check if class is done
    if (task.checked) {
      taskContainer.className = "task checked";
    }
    taskContainer.setAttribute("data-id", task.id);
    // p class : text
    let text = document.createElement("p");
    text.className = "text";
    text.appendChild(document.createTextNode(task.title));
    // div class options contains span for date and two buttons
    let options = document.createElement("div");
    options.className = "options";
    let dateSpan = document.createElement("span");
    dateSpan.className = "date-added";
    dateSpan.innerHTML = `task added on: <span>${new Date()}</span>`;
    options.appendChild(dateSpan);
    let buttonsDiv = document.createElement("div");
    buttonsDiv.className = "buttons";
    let remove = document.createElement("button");
    remove.className = "remove";
    remove.appendChild(document.createTextNode("remove"));
    let check = document.createElement("button");
    check.className = "check";
    check.appendChild(document.createTextNode("check"));

    let startTimer = document.createElement("button");
    startTimer.className = "timer";
    startTimer.appendChild(document.createTextNode("Start Task"));

    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(startTimer);
    buttonsDiv.appendChild(check);
    options.appendChild(buttonsDiv);

    taskContainer.appendChild(text);
    taskContainer.appendChild(options);

    // // creating the delete icon

    // add task div to dom
    tasksDiv.appendChild(taskContainer);
    // add task div to front page
    runningTask.innerHTML = arrayOfTasks[arrayOfTasks.length - 1].title;
  });
}
console.log(arrayOfTasks[0].title);
function addDataToLocalStorage(arraryOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arraryOfTasks));
}
function getDataFromLocaleStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}
// to delete the tasks from lockal storage before deleting it from the page
function deletTaskWith(taskId) {
  // for testing
  // for (let i = 0; i < arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`);
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorage(arrayOfTasks);
}

// toggle complaged task
function toggleStatusWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].checked == false
        ? (arrayOfTasks[i].checked = true)
        : (arrayOfTasks[i].checked = false);
    }
  }
  addDataToLocalStorage(arrayOfTasks);
}

/// timer area

let timerContainer = document.querySelector(".timerContainer");
let startStopButton = document.querySelector(".timer-area .stop.start ");
let pauseButton = document.querySelector(".timer-area .pause ");
let breakButton = document.querySelector(".timer-area .brake ");

console.log(breakButton);
let countDownInterval;

// Create the timer display element
const timerDisplay = document.querySelector(".timerContainer .timeSpan");
let duration;
function countDown(initialDuration) {
  duration = initialDuration; // Initialize duration with initialDuration
  timerDisplay.style.zIndex = "3";
  timerDisplay.style.display = "flex";
  timerDisplay.style.justifyContent = "center";
  timerDisplay.style.alignItems = "center";
  timerDisplay.style.textAlign = "center";

  timerContainer.appendChild(timerDisplay);

  countDownInterval = setInterval(() => {
    let minutes, seconds;

    duration--;
    if (duration <= 0) {
      clearInterval(countDownInterval);
      timerDisplay.innerHTML = "Great Job,take five";
      timerContainer.style.background =
        "conic-gradient(#f44336 100%, transparent 100%)"; // Reset background
      return;
    }

    minutes = Math.floor(duration / 60);
    seconds = Math.floor(duration % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Update background and timer display using template literals
    const percentage = (duration / 1500) * 100;
    const gradientString = `conic-gradient(red ${percentage}%, transparent ${percentage}%)`;
    timerContainer.style.background = gradientString;
    timerDisplay.textContent = `${minutes}:${seconds}`;
  }, 1000);
}
let running = false;
let pause = false;
let brake = false;
let foucs = 0;
let workTime = 1500;
let longBreak = 1500;
let shortBreak = 300;

startStopButton.onclick = function () {
  motivateMe();
  if (running == false) {
    startStopButton.innerHTML = "Stop";
    running = true;
    clearInterval(countDownInterval);

    countDown(workTime);
    brake = false;
    foucs++;
    console.log(foucs);
    let icon = document.querySelectorAll(
      ".timer-area .grouping .focus-count .focus"
    );

    if (foucs == 1) {
      icon[0].style.opacity = 1;
    } else if (foucs == 2) {
      icon[0].style.opacity = 1;
      icon[1].style.opacity = 1;
    } else if (foucs == 3) {
      icon[0].style.opacity = 1;
      icon[1].style.opacity = 1;
      icon[2].style.opacity = 1;
    } else if (foucs == 4) {
      icon[0].style.opacity = 1;
      icon[1].style.opacity = 1;
      icon[2].style.opacity = 1;
      icon[3].style.opacity = 1;
    }

    setTimeout(function () {
      if (foucs === 4) {
        timerDisplay.innerHTML = "Awesome, let's have a long break";
        console.log(duration);
      }
    }, duration * 1000);
  } else {
    startStopButton.innerHTML = "Work";
    clearInterval(countDownInterval);
    running = false;
    pauseButton.innerHTML = "Pause";
    pause = false;
  }
};
pauseButton.onclick = function () {
  if (running && pause == true) {
    pauseButton.innerHTML = "Pause";
    countDown(duration);
    console.log(running);
    pause = false;
  } else if (running && pause == false) {
    pauseButton.innerHTML = "Resume";
    clearInterval(countDownInterval);
    console.log(duration);
    console.log(running);
    pause = true;
  }
};

// console.log(icon);
breakButton.onclick = function () {
  console.log(duration);
  if (duration === 0 && brake == false && foucs != 4) {
    clearInterval(countDownInterval);
    countDown(shortBreak);
    setTimeout(function () {
      startStopButton.innerHTML = "Work";
      clearInterval(countDownInterval);
      running = false;
      pauseButton.innerHTML = "Pause";
      pause = false;
      brake = true;
      timerDisplay.innerHTML = "End of break Time to work";
    }, duration * 1000);
  } else if (brake == false && duration == 0 && foucs == 4) {
    console.log("it's working");
    clearInterval(countDownInterval);
    countDown(longBreak);
    console.log(duration);
    setTimeout(function () {
      startStopButton.innerHTML = "Work";
      clearInterval(countDownInterval);
      running = false;
      pauseButton.innerHTML = "Pause";
      pause = false;
      brake = true;
      timerDisplay.innerHTML = "End of break Time to work";
      foucs = 0;
      let icon = document.querySelectorAll(
        ".timer-area .grouping .focus-count .focus"
      );
      if (foucs == 0) {
        icon[0].style.opacity = 0.4;
        icon[1].style.opacity = 0.4;
        icon[2].style.opacity = 0.4;
        icon[3].style.opacity = 0.4;
      }
    }, duration * 1000);
  }
};
// motivateMe();
// function motivateMe() {
//   console.log("what is going on");

//   let requestMotivation = new XMLHttpRequest();
//   requestMotivation.onreadystatechange = function () {
//     console.log(this.readyState);
//     if (this.readyState === 4 && this.status == 200) {
//       let motoData = JSON.parse(this.responseText);
//       console.log(motoData);
//       let randomIndex = Math.floor(Math.random() * motoData.length);
//       let randomQuate = motoData[randomIndex];
//     }
//     // Make the GET request to fetch motivation data from a URL
//     requestMotivation.open("GET", "quotes.json", true);
//     requestMotivation.send();
//   };
// }
function motivateMe() {
  let quoteArea = document.querySelector(".timer-area .grouping .quate");

  let requestMotivation = new XMLHttpRequest();

  requestMotivation.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      let motoData = JSON.parse(this.responseText);
      let randomIndex = Math.floor(Math.random() * motoData.length);
      let randomQuote = motoData[randomIndex].quote;

      // Display or use the random quote as needed
      quoteArea.innerHTML = randomQuote;
      console.log(quoteArea);
    }
  };

  // Make the GET request to fetch motivation data from a URL
  requestMotivation.open("GET", "quotes.json", true);
  requestMotivation.send();
}

// Call the motivateMe function to fetch and display a random quote
