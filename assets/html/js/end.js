var username = document.querySelector('#username')
var saveScoreBtn = document.querySelector('#saveScoreBtn')
var finalScore = document.querySelector('#finalScore')
var recentScore = localStorage.getItem('recentScore')

var highScores = JSON.parse(localStorage.getItem('highScores')) || []

var MAX_HIGH_SCORES = 5

finalScore.innerText = recentScore

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    var score = {
        score: recentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('./highscores.html')

    
}