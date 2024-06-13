let quizData = [
  {
    question: "What is the correct syntax to print a message in the console?",
    options: [
      "print('Hello, World!');",
      "console.log('Hello, World!');",
      "echo('Hello, World!');",
      "document.write('Hello, World!');",
    ],
    answer: "console.log('Hello, World!');",
  },
  {
    question: "Which of the following is a JavaScript data type?",
    options: ["number", "string", "boolean", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function myFunction() {}",
      "def myFunction() {}",
      "create myFunction() {}",
      "function: myFunction() {}",
    ],
    answer: "function myFunction() {}",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    options: ["onmouseclick", "onchange", "onclick", "onmouseover"],
    answer: "onclick",
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: [
      "var carName;",
      "variable carName;",
      "v carName;",
      "declare carName;",
    ],
    answer: "var carName;",
  },
  {
    question: "What is the correct way to write an array in JavaScript?",
    options: [
      "var colors = 'red', 'green', 'blue';",
      "var colors = (1:'red', 2:'green', 3:'blue');",
      "var colors = ['red', 'green', 'blue'];",
      "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue');",
    ],
    answer: "var colors = ['red', 'green', 'blue'];",
  },
  {
    question: "How do you round the number 7.25 to the nearest integer?",
    options: ["Math.rnd(7.25)", "Math.round(7.25)", "round(7.25)", "rnd(7.25)"],
    answer: "Math.round(7.25)",
  },
  {
    question: "What is the correct way to add a comment in JavaScript?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "' This is a comment",
      "* This is a comment *",
    ],
    answer: "// This is a comment",
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["*", "-", "=", "x"],
    answer: "=",
  },
  {
    question: "What will the following code return: Boolean(10 > 9)?",
    options: ["true", "false", "NaN", "undefined"],
    answer: "true",
  },
];

let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 59;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const scoreContainer = document.getElementById("score-container");
const timerDisplay = document.getElementById("timer");

nextButton.addEventListener("click", loadNextQuestion);
submitButton.addEventListener("click", showQuizResults);

displayQuestion();
startTimer();
let timer;

function updateTimer() {
  if (timeLeft > 0) {
    const seconds = timeLeft;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    timerDisplay.textContent = displaySeconds;
    timeLeft--;
  } else {
    timerDisplay.textContent = "Finish!!";
    showQuizResults();
  }
}

function startTimer() {
  updateTimer();
  timer = setInterval(updateTimer, 1000);
}

function loadNextQuestion() {
  if (currentQuestionIndex < quizData.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showQuizResults();
  }
}

function selectAnswer(answer) {
  const optionButtons = document.querySelectorAll(".quiz-option");
  optionButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  const selectedOption = optionsContainer.querySelector(
    `.quiz-option[data-option="${answer}"]`
  );
  selectedOption.classList.add("selected");
  userAnswers[currentQuestionIndex] = answer;
}

function displayQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";
  const optionLetters = ["A", "B", "C", "D"];

  currentQuestion.options.forEach((option, index) => {
    const optionContainer = document.createElement("div");
    optionContainer.classList.add("quiz-card");

    const optionLabel = document.createElement("span");
    optionLabel.classList.add("option-label");
    optionLabel.textContent = optionLetters[index];
    optionContainer.appendChild(optionLabel);

    const optionButton = document.createElement("button");
    optionButton.classList.add("quiz-option");
    optionButton.textContent = option;

    optionButton.setAttribute("data-option", option);
    optionContainer.addEventListener("click", () => selectAnswer(option));
    optionContainer.appendChild(optionButton);

    optionsContainer.appendChild(optionContainer);
  });
}

function evaluateUserAnswers() {
  let score = 0;
  quizData.forEach((question, index) => {
    if (userAnswers[index] === question.answer) score += 1;
  });
  return score;
}

function showQuizResults() {
  const userScore = evaluateUserAnswers();
  scoreContainer.textContent = `Your score ${userScore} out of ${quizData.length}`;
}
