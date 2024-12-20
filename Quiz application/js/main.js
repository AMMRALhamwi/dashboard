// select the elements
let countSpan = document.querySelector(".quiz-app .quiz-info .count span");
let bulletSpanContainer = document.querySelector(".quiz-app .bullets .spans");
let bullets = document.querySelector(".bullets");
let quizArea = document.querySelector(".quiz-app .quiz-area");
let answersArea = document.querySelector(".quiz-app .answers-area");
let submitButton = document.querySelector(".quiz-app .submit-button");
let resuletsContainer = document.querySelector(".quiz-app .results");
let countdownElement = document.querySelector(".quiz-app .bullets .countdown");

// set options
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
      submitButton.onclick = function () {
        // getting the right answer
        let rightAnswer = questionsObject[currentIndex].right_answer;
        // bucause the user chose an answer increase the index
        currentIndex++;
        // check the answer
        checkanswer(rightAnswer, questionsCount);
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
      };
    }
  };
  myRequest.open("Get", "htmlQuestion.json", true);
  myRequest.send();
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
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      thechosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rightAnswer === thechosenAnswer) {
    rightAnswers++;
    console.log("Your answer is correct");
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
