// selecting the elements needed

let page = document.querySelector(".page");
let container = document.querySelector(".page ");
let form = document.querySelector(".page  .form");
let inputText = document.querySelector(".page  .form .input-text");
let newTaskSubmitButton = document.querySelector(".page  .form .new-task");
let tasksDiv = document.querySelector(".page  .tasks");
// let taskText = document.querySelector(".page .tasks .task .text");
// let taskDelete = document.querySelector(".page .tasks .task .buttons .remove");
// console.log(taskText);

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
    startTimer.appendChild(document.createTextNode("Start Timer"));

    buttonsDiv.appendChild(remove);
    buttonsDiv.appendChild(startTimer);
    buttonsDiv.appendChild(check);
    options.appendChild(buttonsDiv);

    taskContainer.appendChild(text);
    taskContainer.appendChild(options);

    // console.log(taskContainer);
    // // creating the delete icon

    // taskContainer.appendChild(remove);

    // add task div to dom
    tasksDiv.appendChild(taskContainer);
  });
}

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

function countDown(duration) {
  let countDownInterval; // declearing intervale inside function's scoop
  countDownInterval = setInterval(function () {
    let minutes, seconds;
    duration--;
    if (duration < 0) {
      clearInterval(countDownInterval); // clearing intervale
      timerContainer.innerHTML = "Time's up!"; // Or any other message you want
      return; // exit the function
    }
    minutes = Math.floor(duration / 60);
    seconds = Math.floor(duration % 60);

    minutes = minutes < 10 ? "0" + minutes : minutes; // Use "+" to concatenate strings
    seconds = seconds < 10 ? "0" + seconds : seconds;

    timerContainer.innerHTML = `${minutes} : ${seconds}`;
  }, 1000);
}

countDown(1500); // Start the countdown
