
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
    question: "What's Grishka's favorite food?",
    choice1: "Tuna",
    choice2: "His own shit",
    choice3: "Salmon",
    choice4: "Berries",
    answer: 3
  },

  {
    question: "Qu'elle est le but des diplômates fesses?",
    choice1: "Faire régner la loi équitablement",
    choice2: "Etre impartial",
    choice3: "Réflichir",
    choice4: "Faire chier les gens",
    answer: 4
  },

  {
    question: "Qu'elle est le plus grand petit plaisir des bounchics",
    choice1: "Se battre",
    choice2: "Faire la guerre",
    choice3: "Labourer des green de golf fraîchement tondus",
    choice4: "Charger un individu",
    answer: 3
  },

    {
    question: "Qui est le plus propre?",
    choice1: "Le crâne de Zidane",
    choice2: "La cuisine de Gordom Ramsey",
    choice3: "Le Porc Scellé",
    choice4: "Les fesses de Grishka",
    answer: 3
  },

    {
    question: "Qui est l'ennemi que le roi Bounchic craint le plus?",
    choice1: "Monsieur Fesse",
    choice2: "Porcu",
    choice3: "Festo",
    choice4: "Ronron",
    answer: 1
  },

    {
    question: "What's the best ligue 1 club?",
    choice1: "Lyon",
    choice2: "Lille",
    choice3: "PSG",
    choice4: "Reims",
    answer: 3
  },

    {
    question: "Qu'elle est l'activité favorite de GP?",
    choice1: "Lire l'encyclopédie",
    choice2: "Dormir",
    choice3: "Faire un marathon",
    choice4: "Participer à des débats politiques",
    answer: 2
  },

    {
    question: "What is more dangerous?",
    choice1: "Jump from a plane without a parachute",
    choice2: "Faire un 1v1 contre la Montagne",
    choice3: "Surf on lava",
    choice4: "Retirer l'écharpe de Grishka",
    answer: 4
  },

    {
    question: "Where is Mishka from?",
    choice1: "Germany",
    choice2: "Russia",
    choice3: "Canada",
    choice4: "Antartica",
    answer: 3
  },

  {
    question: "How many times a day does Grishka wipe his ass?",
    choice1: "3",
    choice2: "1",
    choice3: "Never",
    choice4: "25",
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











