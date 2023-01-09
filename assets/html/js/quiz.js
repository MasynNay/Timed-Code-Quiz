//HTML elements for manipulation
var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
var progressBarFull = document.querySelector('#progressBarFull');
var quizTimer = document.getElementById("timer");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

//Questions
let questions = [
    {
        question: 'Commonly used data types do NOT include:',
        choice1: 'Booleans',
        choice2: 'Strings',
        choice3: 'Alerts',
        choice4: 'Numbers',
        answer: 3,
    },
    {
        question:
            "The condition in an if / else statement is enclose within _____.",
        choice1: "Parentheses",
        choice2: "Curly Brackets",
        choice3: "Square Brackets",
        choice4: "Quotes",
        answer: 2,
    },
    {
        question: "Arrays in Javascript can be used to store _____.",
        choice1: "Other Arrays",
        choice2: "Booleans",
        choice3: "Numbers and Strings",
        choice4: "All of the Above",
        answer: 4,
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        choice1: "Parentheses",
        choice2: "Curly Brackets",
        choice3: "Quotes",
        choice4: "Commas",
        answer: 3,
    },
    {
      question: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choice1: "Console.log",
      choice2: "For Loops",
      choice3: "Terminal/Bash",
      choice4: "Javascript",
      answer: 1,
  }
]

//Other global variables
var SCORE_POINTS = 100
var MAX_QUESTIONS = 5
var timeLeft = 60;
var timerInterval;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()

    timerInterval = setInterval(function() {
      timeLeft--;
      quizTimer.textContent = "Time Left: " + timeLeft;
    
      if(timeLeft === 0) {
        clearInterval(timerInterval);
        return window.location.assign('./end.html')
      }
    }, 1000);
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('recentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }else if (classToApply === 'incorrect')
        timeLeft = timeLeft -10

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()