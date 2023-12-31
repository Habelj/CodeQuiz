const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var timer = document.querySelector('#timer')
var totaltime = 75
function starttimer() {
const gameclock = setInterval(()=> {
    totaltime --;
    timer.textContent = totaltime
    console.log ('test')
    if(totaltime <= 0) {
        clearInterval(gameclock)
    }
}, 1000)
}

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What does HTML stand for?',
        choice1: 'Happytext Markup Language',
        choice2: 'Hypertext Markup Language',
        choice3: 'Happytext Makeup Language',
        choice4: 'ummm I dont know',
        answer: 2,
    },
    {
        question: 'How do you begin to create an if statement?',
        choice1: 'if',
        choice2: 'for',
        choice3: 'var',
        choice4: 'function',
        answer: 1,
    },
    {
        question: 'How do you add changes made to your command line?',
        choice1: 'git push',
        choice2: 'git pull',
        choice3: 'git commit',
        choice4: 'git add',
        answer: 4,
    },
    {
        question: 'What does Javascript do?',
        choice1: 'gives content structure',
        choice2: 'gives content style',
        choice3: 'allows users to interact with website',
        choice4: 'ummm I dont know',
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
    starttimer()
}

getNewQuestion = () =>{
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
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
        }
        
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