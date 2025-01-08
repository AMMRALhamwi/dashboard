// selecting the elements needed

let page = document.querySelector(".page");
let container = document.querySelector(".page ");
let form = document.querySelector(".page  .form");
let inputText = document.querySelector(".page  .form .input-text");
let newTaskSubmitButton = document.querySelector(".page  .form .new-task");
let tasksDiv = document.querySelector(".page  .tasks");
let taskDiv = document.querySelector(".page  .tasks .task");
let taskText = document.querySelector(".page  .tasks .task .text");
let taskIcon = document.querySelector(".page  .tasks .task .icon");

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
  if (e.target.classList.contains("delete")) {
    // remove element from local storage
    // document.setAttribute
    deletTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // task element

  if (e.target.classList.contains("task")) {
    // toggle complaged task
    toggleStatusWith(e.target.getAttribute("data-id"));
    // toggle class
    e.target.classList.toggle("done");
  }
});

// the function that adds the task to array
function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    checked: false,
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
    let div = document.createElement("div");
    div.className = "task";
    // check if class is done
    if (task.checked) {
      div.className = "task checked";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // console.log(div);
    // creating the delete icon
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("delete"));
    div.appendChild(span);

    // add task div to dom
    tasksDiv.appendChild(div);
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

// the end of the event
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

countDown(120); // Start the countdown
