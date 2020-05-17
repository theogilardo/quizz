
const finalScore = document.getElementById('finalScore');
const endIcon = document.getElementById('endIcon');
const finalText = document.getElementById('finalText');

let getScore = localStorage.getItem('score');
let questionCount = localStorage.getItem('questionCount');
let totalScore = 10 * questionCount
let progressScore = (getScore / totalScore) * 100

finalScore.innerHTML = `<span>${getScore}</span><br>points`


if (getScore <= 25) {
  endIcon.src = '../img/bad.png'
  finalText.textContent = 'Not so good, try again!'
} else if (getScore > 25 && getScore <= 50) {
  endIcon.src = '../img/moderate.png'
  finalText.textContent = 'Meh, you can do better!'
} else if (getScore > 50 && getScore <= 75) {
  endIcon.src = '../img/good.png'
  finalText.textContent = 'Good job!'
} else if (getScore > 75) {
  finalText.textContent = 'Outstanding!'
  endIcon.src = '../img/great.png'
}

