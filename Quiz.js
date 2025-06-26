const questions = [
  {
    question: "What does HTML stand for ?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Highlevel Text Management Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What is the purpose of CSS in web development ?",
    options: [
      "To structure content",
      "To add interactivity",
      "To style and layout web pages",
      "To manage databases"
    ],
    answer: "To style and layout web pages"
  },
  {
    question: "Which tag is used to create a hyperlink in HTML ?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>"
  },
  {
    question: "What is JavaScript primarily used for ?",
    options: [
      "Styling web pages",
      "Creating static web content",
      "Adding interactivity to web pages",
      "Managing web servers"
    ],
    answer: "Adding interactivity to web pages"
  },
  {
    question: "Which of the following is a JavaScript framework ?",
    options: ["React", "Laravel", "Django", "Bootstrap"],
    answer: "React"
  },
  {
    question: "What does DOM stand for in web development ?",
    options: [
      "Document Object Model",
      "Data Object Model",
      "Digital Ordinance Model",
      "Design Object Management"
    ],
    answer: "Document Object Model"
  },
  {
    question: "Which HTML element is used for inserting a line break?",
    options: ["<br>", "<lb>", "<break>", "<line>"],
    answer: "<br>"
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript ?",
    options: [
      "The current HTML element",
      "The window object",
      "The object from which it was called",
      "The previous function"
    ],
    answer: "The object from which it was called"
  },
  {
    question: "Which CSS property is used to change text color ?",
    options: ["text-color", "font-color", "color", "text-style"],
    answer: "color"
  },
  {
    question: "What does API stand for ?",
    options: [
      "Application Programming Interface",
      "Applied Programming Instruction",
      "Advanced Program Integration",
      "Automated Process Interface"
    ],
    answer: "Application Programming Interface"
  }
];

let currentQuestionIndex = 0;
let score = 0;

let questionEl = document.getElementById("question");
let optionsEl = document.getElementById("options");
let nextBtn = document.getElementById("next-btn");
let scoreEl = document.getElementById("score");

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsEl.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  const selectedAnswer = button.textContent;
  if (selectedAnswer === correctAnswer) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
  }

  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = "green";
    }
  });

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = `<h2>You scored ${score} out of ${questions.length}</h2>
    <button id="restart-btn" style="margin-top: 20px; padding: 10px 20px; font-size: 16px; cursor: pointer; border-radius: 8px; background-color: #00adb5; color: white; border: none;">Restart Quiz</button>`;

  document.getElementById("restart-btn").addEventListener("click", restartQuiz);
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  const quizBox = document.getElementById("quiz-box");
  quizBox.innerHTML = `
    <h2 id="question"></h2>
    <div id="options"></div>
    <button id="next-btn" style="display: none;">Next</button>
    <p id="score"></p>
  `;

  questionEl = document.getElementById("question");
  optionsEl = document.getElementById("options");
  nextBtn = document.getElementById("next-btn");
  scoreEl = document.getElementById("score");

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showScore();
    }
  });

  loadQuestion();
}

loadQuestion();
