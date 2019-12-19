document.addEventListener('DOMContentLoaded', ()=>{
    console.log("you are here")
    subjectsFetch()
    questionsFetch()
    gameSessions()
})


function subjectsFetch(){
    fetch('http://localhost:3000/subjects')
    .then(response => response.json())
    .then(tests => {debugger})
}

function questionsFetch(){
    fetch('http://localhost:3000/questions')
    .then(response => response.json())
    .then(questions => { })
}

function gameSessions(){
    fetch('http://localhost:3000/game_sessions')
    .then(response => response.json())
    .then(games => {})
}
