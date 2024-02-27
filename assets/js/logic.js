const startButton = document.querySelector("#start");
const timer = document.querySelector("#time");
const timerTxt = document.querySelector(".timer");
const startScreen = document.querySelector("#start-screen");
const questionArea = document.querySelector("#questions");
const questionTitle = document.querySelector("#question-title");
const choices = document.querySelector("#choices");
const endScreen = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const submitBtn = document.querySelector("#submit");
const feedback = document.querySelector("#feedback");

// I'm setting the totaltime of the quiz equal to 2 minutes.
let score = 0;
//Sets time for countdown
let timeLeft = 120;

//Sets timer/begins countdown
function countdown() {
    let timeInterval = setInterval(function () {

    if(timeLeft >1) {
      timer.textContent = timeLeft;
      timeLeft--; 
      } else {
      clearInterval(timeInterval);
      gameOver();
      }
    }, 1000);

    };

// Start button hides start screen & displays questions

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    countdown();
    startScreen.classList.add("hide");
    questionArea.classList.remove("hide");
    displayQuestion();
  });

function displayQuestion() {
    //clear previous questions buttons
    choices.innerHTML = "";
    const currentQuestion = questions.shift();
    questionTitle.textContent = currentQuestion.question;
    const options = Object.values(currentQuestion).slice(1);

    for (let [choice, answerKey] of options) {
        const choiceButton = document.createElement("button");
        choiceButton.classList.add("answer-button");
        choiceButton.textContent = choice;
        choiceButton.key = answerKey;
        choices.appendChild(choiceButton);
        choiceButton.addEventListener("click", handleButtonClick);

    };
};


// Function to check if correct answer was clicked, if so displayCorrectAnswer() is called (it checks if object key is equal to "correct")
function handleButtonClick(event) {
    const key = event.target.key;
    // Check which button was clicked
    const clickedButton = event.target;
    if (key) {
      clickedButton.style.backgroundColor = "green";
      feedback.classList.remove("hide");
      feedback.innerHTML = 'Correct!';
      correctAudio();
      score+=10;    
    } else {
      clickedButton.style.backgroundColor = "red";
      feedback.classList.remove("hide");
      feedback.innerHTML = 'Incorrect!';
      incorrectAudio();
      timeLeft -= 10;
    };
//Go to next question
    if(questions.length == 0) {
        setTimeout(gameOver, 500);
    } else {
        setTimeout(displayQuestion, 500);
    }

  };

  // Function to play a correct sound
function correctAudio() {
    let correctWav = new Audio();
    correctWav.src = "assets/sfx/correct.wav";
    correctWav.play();
  }
  // Function to play a wrong sound
  function incorrectAudio() {
    let incorrectWav = new Audio();
    incorrectWav.src = "assets/sfx/incorrect.wav";
    incorrectWav.play();
  };

//Displays end screen
function gameOver() {
    timerTxt.classList.add("hide");
    questionArea.classList.add("hide");
    endScreen.classList.remove("hide");
    feedback.classList.add("hide");
    finalScore.textContent = score;
};

  //Submitting user info
  submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    const initials = document.querySelector("#initials").value;

    if (initials === "") {
        alert("Error: Input cannot be blank");
    } else {
        //use date to create unique key so scores aren't overwritten
        let date = new Date();
        localStorage.setItem(date, `${initials}: ${score}`);
        location.href = "./highscores.html";
    }

  });
