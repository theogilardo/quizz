
const question = document.getElementById('question');
const scoreText = document.getElementById('scoreText');
const questionProgress = document.getElementById('questionProgress');
const loadBar = document.getElementById('loadBar');
const loadText = document.getElementById('loadText');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let questionCounter = 0;
let score = 0;
let questions = [
  {
    question: "What's the capital of France?",
    choice1: "Paris",
    choice2: "Reims",
    choice3: "Marseille",
    choice4: "London",
    answer: 1
  },

  {
    question: "What's 2 x 2 + 2 + 2 / 2",
    choice1: "8",
    choice2: "5",
    choice3: "7",
    choice4: "9",
    answer: 3
  },

  {
    question: "How many corners are in a square ?",
    choice1: "1",
    choice2: "6",
    choice3: "4",
    choice4: "3",
    answer: 3
  },

  {
    question: "How many kms is a marathon ?",
    choice1: "30",
    choice2: "21",
    choice3: "15",
    choice4: "42",
    answer: 4
  }
];

const questionTotal = questions.length;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [ ...questions];
  newQuestion();
}

function newQuestion() {

  // Store score in local server
  localStorage.setItem('score', score);
  let getScore = localStorage.getItem('score');

  // Store # of questions in local server
  localStorage.setItem('questionCount', questionCounter);
  let questionCount = localStorage.getItem('questionCount');

  if (availableQuestions.length === 0) {
      return window.location.assign('/end.html');
  }
  // Pick current question of the questions array
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];

  // Display current question of the questions array
  question.innerText = currentQuestion.question;

  // Iterate over the choice element in the html for the current question
  // and assign to each choice element one choice within the question array
  choices.forEach(choice => {
    const number = choice.dataset.number
    choice.innerText = currentQuestion['choice' + number]
  });

  // Update loading
  loadBar.style.width = `${(questionCounter/questionTotal)*100}%`
  loadText.innerText = `${Math.floor((questionCounter/questionTotal)*100)}%`

  // Update question progress
  questionCounter ++
  questionProgress.innerText = `Question: ${questionCounter}/${questionTotal}`


  // Once question is answered, get rid of it in the array
  availableQuestions.splice(questionIndex, 1)


};

  choices.forEach(choice => {
    choice.addEventListener('click', event => {
      // Select event target
      const selectedTarget = event.target
      const selectedAnswer = parseInt(selectedTarget.dataset.number)

      // Check if target is correct or not
      const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'wrong';

      if (classToApply === 'correct') {
          increment();
      }

      // Update score
      scoreText.innerText = score;

      // Apply style class depending on the answer
      selectedTarget.parentElement.classList.add(classToApply)


      setTimeout(function () {
          selectedTarget.parentElement.classList.remove(classToApply)
          newQuestion();
      }, 1000);

    })


  });


startGame();


function increment() {
    score += 10
};











