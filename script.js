// ====== Question Data (array of objects) ======
const questions = [
  {
    question: "Which of the following is a JavaScript data type?",
    answers: ["String", "Character", "Float", "Double"],
    correct: "String"
  },
  {
    question: "What is the correct syntax to print a message in the console?",
    answers: ["console.print()", "print()", "echo()", "console.log()"],
    correct: "console.log()"
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    answers: ["//", "<!-- -->", "#", "/* */"],
    correct: "//"
  },
  {
    question: "Which method is used to convert JSON data to a JavaScript object?",
    answers: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.decode()"],
    correct: "JSON.parse()"
  },
  {
    question: "How do you declare a variable in JavaScript?",
    answers: ["int x = 10;", "let x = 10;", "dim x = 10;", "val x = 10;"],
    correct: "let x = 10;"
  },
  {
    question: "Which of the following is NOT a loop structure in JavaScript?",
    answers: ["for", "while", "foreach", "do...while"],
    correct: "foreach"
  },
  {
    question: "What will `typeof null` return in JavaScript?",
    answers: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correct: "'object'"
  },
  {
    question: "How can you create a function in JavaScript?",
    answers: ["function myFunction()", "def myFunction()", "fun myFunction()", "void myFunction()"],
    correct: "function myFunction()"
  },
  {
    question: "Which operator is used to compare both value and type?",
    answers: ["==", "=", "===", "!="],
    correct: "==="
  },
  {
    question: "What does DOM stand for?",
    answers: ["Data Object Model", "Document Object Model", "Display Object Management", "Document Oriented Method"],
    correct: "Document Object Model"
  }
];


// ====== DOM Elements ======
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// ====== State Variables ======
let currentQuestionIndex = 0;
let score = 0;

// ====== Initialize Quiz ======
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = "";
  nextButton.textContent = "Next";
  showQuestion();
}

// ====== Display Current Question ======
function showQuestion() {
  resetState();

  // Get current question object
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Create answer buttons dynamically
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(button, currentQuestion.correct));
    answerButtons.appendChild(button);
  });
}

// ====== Reset UI State ======
function resetState() {
  nextButton.style.display = "none";        // Hide next button
  answerButtons.innerHTML = "";             // Clear previous buttons
  scoreElement.textContent = `Score: ${score}/${questions.length}`; // Show score
}

// ====== Handle Answer Selection ======
function selectAnswer(selectedButton, correctAnswer) {
  const selectedAnswer = selectedButton.textContent;
  const buttons = Array.from(answerButtons.children);

  // Mark buttons as correct/wrong
  buttons.forEach(button => {
    if (button.textContent === correctAnswer) {
      button.classList.add('correct');     // Correct answer button
    } else if (button === selectedButton) {
      button.classList.add('wrong');       // Wrong selected button
    }
    button.disabled = true;               // Disable all buttons
  });

  // Increase score if answer is correct
  if (selectedAnswer === correctAnswer) {
    score++;
  }

  scoreElement.textContent = `Score: ${score}/${questions.length}`;
  nextButton.style.display = "block";     // Show next button
}

// ====== Next Button Click Event ======
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showFinalScore();
  }
});

// ====== Final Score Display ======
function showFinalScore() {
  resetState();
  questionElement.textContent = `🎉 You scored ${score} out of ${questions.length}!`;

  // Change next button to restart
  nextButton.textContent = "Restart Quiz";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

// ====== Start the Quiz on Load ======
startQuiz();
