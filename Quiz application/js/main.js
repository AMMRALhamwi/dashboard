// select the selection buttons
let selectionLinksContainer = document.querySelector(
  ".quiz-app .selection-links"
);
let selectionLinks = document.querySelector(
  ".quiz-app .selection-links .select-test"
);
let selectionList = document.querySelectorAll(
  ".quiz-app .selection-links .select-test li"
);
let englishSimplePresent = document.getElementById("simplePresent");
let englishPresentContinuous = document.getElementById("presentContinuous");
// console.log(selectionList.data.json);

// select the elements
let countSpan = document.querySelector(".quiz-app .quiz-info .count span");
let category = document.querySelector(".quiz-app .quiz-info .category span");

let bulletSpanContainer = document.querySelector(".quiz-app .bullets .spans");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-app .quiz-area");
let answersArea = document.querySelector(".quiz-app .answers-area");
let submitButton = document.querySelector(".quiz-app .submit-button");
let resuletsContainer = document.querySelector(".quiz-app .results");
let countdownElement = document.querySelector(".quiz-app .bullets .countdown");

// set options
let tests = ["simplePresent.json", "presentContinuous.json"];
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;
function getQuestions() {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status == 200) {
      let questionsObject = JSON.parse(this.responseText);
      let questionsCount = questionsObject.length;

      //create bullets and set question count
      createBullets(questionsCount);

      // add question data
      addQusstionData(questionsObject[currentIndex], questionsCount);

      //start countDown
      countDown(180, questionsCount);

      //click on submit button
      let clicked = 0;

      submitButton.onclick = function () {
        clicked++;
        if (clicked % 2 === 0) {
          submitButton.innerHTML = "Check Answer";
          // delete the previous data
          quizArea.innerHTML = "";
          answersArea.innerHTML = "";
          // add next question data
          addQusstionData(questionsObject[currentIndex], questionsCount);
          // handle bullets class
          handleBullets();
          //start countDown
          clearInterval(countDownInterval);
          countDown(180, questionsCount);
          // show resulets
          showresults(questionsCount);
        } else {
          submitButton.innerHTML = "Submit Answer";
          // getting the right answer
          let rightAnswer = questionsObject[currentIndex].right_answer;
          // bucause the user chose an answer increase the index
          currentIndex++;
          // check the answer
          checkanswer(rightAnswer, questionsCount);
          // show the right and the chosen answer
        }
      };
    }
  };
  selectionList.forEach((li) => {
    li.onclick = function () {
      myRequest.open("Get", li.dataset.json, true);
      myRequest.send();
      selectionLinksContainer.style.display = "none";
      submitButton.style.display = "block";
      category.innerHTML = li.dataset.category;
    };
  });
}

getQuestions();

function createBullets(numberOfQuestion) {
  countSpan.innerHTML = numberOfQuestion;
  // create spans
  for (let i = 0; i < numberOfQuestion; i++) {
    // create Spans for the bullets
    let theBullet = document.createElement("span");
    // checks if it is the first span
    if (i === 0) {
      theBullet.className = "on";
    }

    // append bullets to main bullet container
    bulletSpanContainer.appendChild(theBullet);
  }
}

function addQusstionData(questionsObject, questionsCount) {
  if (currentIndex < questionsCount) {
    let questionTille = document.createElement("h2");
    // create question text
    let questionText = document.createTextNode(questionsObject.title);
    //   append text to hedding
    questionTille.appendChild(questionText);
    //   append heading to quiz area

    quizArea.appendChild(questionTille);

    // create the answers

    for (let i = 0; i <= 3; i++) {
      // create main answer div
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      let radioInput = document.createElement("input");
      // add type , name , id ,and data-attibute
      radioInput.type = "radio";
      radioInput.name = "question";
      radioInput.id = `answer_${i + 1}`;

      radioInput.dataset.answer = questionsObject[`answer_${i + 1}`];

      let labelAnswer = document.createElement("label");
      // add answers-label class
      labelAnswer.className = "answers-label";
      // add for attibute
      labelAnswer.htmlFor = `answer_${i + 1}`;
      // create label text
      let labelText = document.createTextNode(
        questionsObject[`answer_${i + 1}`]
      );
      // append text to label
      labelAnswer.appendChild(labelText);
      // append radio and label to the main div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(labelAnswer);
      // append main div to ansers area
      answersArea.appendChild(mainDiv);
    }
  }
}

// check the answer
function checkanswer(rightAnswer, questionsCount) {
  let answers = document.getElementsByName("question");

  let thechosenAnswer;
  let userAnsewer;
  let answersLabel = document.querySelectorAll(".answers-label");
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      thechosenAnswer = answers[i].dataset.answer;
      userAnsewer = answers[i];
    }
  }
  if (rightAnswer === thechosenAnswer) {
    rightAnswers++;
    for (i = 0; i < answersLabel.length; i++) {
      if (answersLabel[i].innerHTML == rightAnswer) {
        answersLabel[i].style.color = "green";
      }
    }
  } else if (rightAnswer !== thechosenAnswer) {
    for (i = 0; i < answersLabel.length; i++) {
      if (answersLabel[i].innerHTML != rightAnswer) {
        answersLabel[i].style.color = "red";
      } else {
        answersLabel[i].style.color = "green";
      }
    }
  } else {
    console.log("no answers");
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}

function showresults(questionsCount) {
  let resulets;
  if (currentIndex === questionsCount) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();
    if (rightAnswers > questionsCount / 2 && rightAnswers < questionsCount) {
      resulets = `<span class="good" >Good job</span>, ${rightAnswers} out of ${questionsCount} `;
    } else if (rightAnswers == questionsCount) {
      resulets = ` <span class="perfect" >Great job</span> , You answered all questions correctly`;
    } else {
      resulets = ` <span class="bad" >Are you okey ? Have a cup of coffee then try again</span>, right answers are ${rightAnswers} out of ${questionsCount}`;
    }
    resuletsContainer.innerHTML = resulets;
  }
}

function countDown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countDownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0) {
        clearInterval(countDownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
