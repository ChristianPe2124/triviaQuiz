// QUESTIONS ARRAY
const questions = [
  {
    question: "What geometric shape is generally used for stop signs?",
    answers: [
      { text: "Square", correct: false },
      { text: "Circle", correct: false },
      { text: "Hexagon", correct: false },
      { text: "Octagon", correct: true },
    ],
  },
  {
    question: "Who named the Pacific Ocean?",
    answers: [
      { text: "Leonardo da Vinci ", correct: false },
      { text: "Ferdinand Magellan", correct: true },
      { text: "Salvator Mundo", correct: false },
      { text: "Rembrandt", correct: false },
    ],
  },
  {
    question: "How many languages are written from right to left?",
    answers: [
      { text: "12", correct: true },
      { text: "15", correct: false },
      { text: "36", correct: false },
      { text: "8", correct: false },
    ],
  },
  {
    question: "What is the name of the man who launched eBay back in 1995?",
    answers: [
      { text: "Jordan Belfort", correct: false },
      { text: "Erica Feidner", correct: false },
      { text: "Joe Girard", correct: false },
      { text: "Pierre Omidyar", correct: true },
    ],
  },
  {
    question:
      "What is the name of the biggest technology company in South Korea?",
    answers: [
      { text: "Nokia", correct: false },
      { text: "Oppo", correct: false },
      { text: "Samsung", correct: true },
      { text: "Apple", correct: false },
    ],
  },
  {
    question: "Which animal can be seen on the Porsche logo?",
    answers: [
      { text: "Rhino", correct: false },
      { text: "Eagle", correct: false },
      { text: "Horse", correct: true },
      { text: "Dog", correct: false },
    ],
  },
];

const questionEL = document.getElementById("question");
const answerButtons = document.getElementById("selection-answer");
const nextButton = document.getElementById("next");

let currentQuestionCount = 0;
let score = 0;

// STARTING OF QUEST
function quizApp() {
  currentQuestionCount = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

// SHOW THE QUESTION FROM questions Array
function showQuestion() {
  resetState();
  //let rndQuestion = Math.floor(Math.random() * 6);
  let currentQuestion = questions[currentQuestionCount];
  let nextQuestion = currentQuestionCount + 1;
  questionEL.innerHTML = nextQuestion + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    // create new button with class btn here will show the list of answer for question
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// REMOVE THE HTML ELEMENT OF BUTTONS
function resetState() {
  nextButton.style.display = "none";
  // this code is for removing the HTML elements firstChild which is the one added in HTML
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// SELECTION OF ANSWER
function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct === "true";
  // this is will check and ADD new Css for correct or wrong answer
  // it will check IF the buttons with the Object data of Correct = true
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  // this array condition it will make the other buttons disable if the answer is wether right or wrong
  // then it will display the NextButton for the Next Question
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct == "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  // show the display none of the next button
  nextButton.style.display = "block";
}
// SHOW FINAL SCORE
function showScore() {
  resetState();
  questionEL.innerHTML =
    "Your total score " + score + " out of " + questions.length + "!";
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// FOR THE NEXT QUESTION
function toNextQuestion() {
  currentQuestionCount++;
  if (currentQuestionCount < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// click function for next Button
nextButton.addEventListener("click", () => {
  // if the Count is less then current Question will be 5 since we got 6 question & the first load is the 1st question
  // if condition is for when there is no click event happen it will either go to next question or stay in current question
  if (currentQuestionCount < questions.length) {
    toNextQuestion();
  } else {
    quizApp();
  }
});

quizApp();
