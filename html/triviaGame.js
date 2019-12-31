
document.addEventListener('DOMContentLoaded', ()=>{
    
    welcomePage()
    
})

function welcomePage(gameOverH1, tryAgainButton, newPlayerButton){

if(gameOverH1 !== undefined) {

    gameOverH1.remove() 
    tryAgainButton.remove()
    newPlayerButton.remove()
}

    let body             = document.querySelector('body')
    let welcomeDiv       = document.createElement('div')
    let mainHeader       = document.createElement('h1')
    let nameForm         = document.createElement('form')
    let nameInput        = document.createElement('input')
    let submitButton     = document.createElement('button')
    let nameInstruction  = document.createElement('h3')
    let arrow            = document.createElement('img')
   
    welcomeDiv.setAttribute('id', 'welcomeDiv')
    mainHeader.setAttribute('id', 'mainHeader')
    nameInput.setAttribute("id", 'nameInput')
    submitButton.setAttribute('id', 'submitButton')
    nameInstruction.setAttribute('id', 'nameInstruccion')

    arrow.setAttribute('src', 'https://img.icons8.com/nolan/96/000000/arrow.png')
    arrow.classList.add('arrow')

    mainHeader.innerText      = "Trivia Master"
    nameInstruction.innerText = "Please insert your name to play"
    submitButton.innerText    = "Start game"

    body.appendChild(welcomeDiv)
    welcomeDiv.append(mainHeader,nameInstruction, arrow, nameForm, submitButton)
    nameForm.append(nameInput)

    submitButton.addEventListener('click',() => {

        let name = document.querySelector('#nameInput').value
        startGame(welcomeDiv, name)

      }
    )

   }




function startGame(welcomeDiv, name, tryAgainButton, newPlayerButton){
    
    if (tryAgainButton !== undefined){

        tryAgainButton.remove()
        newPlayerButton.remove()
        welcomeDiv.remove()
    }
    welcomeDiv.remove()
   
    let body                 = document.querySelector('body')
    let buttonDiv            = document.createElement('div')
    let buttonHistory        = document.createElement('button')
    let buttonRiddles        = document.createElement('button')
    let buttonEntertainment  = document.createElement('button')
    let nameH1               = document.createElement('h2')
   
    buttonHistory.innerText       = "History"
    buttonRiddles.innerText       = "Riddles"
    buttonEntertainment.innerText = "Entertainment"
    nameH1.innerText              = `Welcome ${name}! to start the game you must select a subject...if you dare.`

    buttonDiv.setAttribute('id', 'buttons')
    buttonHistory.setAttribute('id', 'history-button')
    buttonRiddles.setAttribute('id', 'riddle-button')
    buttonEntertainment.setAttribute('id', 'entertainment-button')
  
    nameH1.setAttribute('id', "name-text")

    body.appendChild(buttonDiv)
    buttonDiv.append(nameH1, buttonHistory, buttonRiddles, buttonEntertainment)

    buttonHistory.addEventListener('click',() => {fetchHistory(name)})
    buttonRiddles.addEventListener('click',() => {fetchRiddles(name)})
    buttonEntertainment.addEventListener('click',() => {fetchEntertainment(name)})

}


function win(subject, counter, level){
    ++counter
    ++level
    if (subject.questions.length < counter){
        winner()
    } else {
    displayQuestions(subject, counter, level)
    console.log('you win!')
    }
}


function lose(subject, counter, name){

    console.log('You lose Young')
    document.querySelector('#timer').remove()
    document.querySelector('#question-div').remove()

    let gameOverH1       = document.createElement('h1')
    let newPlayerButton  = document.createElement('button')
    let tryAgainButton   = document.createElement('button')
    let body             = document.querySelector('body')

    gameOverH1.innerText      = 'You lose!'
    newPlayerButton.innerText = "New Player"
    tryAgainButton.innerText  = 'Try again'

    body.append(gameOverH1, tryAgainButton, newPlayerButton)

    gameOverH1.setAttribute('id', 'youLose')
    newPlayerButton.setAttribute('id', 'newPlayer')
    tryAgainButton.setAttribute('id','tryAgain')

    tryAgainButton.addEventListener('click',() => startGame(gameOverH1,name, tryAgainButton, newPlayerButton))
    newPlayerButton.addEventListener('click', () => welcomePage(gameOverH1, tryAgainButton, newPlayerButton))

    let id = subject.id

    let objectConfig = {
        method:"POST",
        headers: {

            'Content-Type': 'application/json',
            "Accept": 'application/json'

        },
        body: JSON.stringify({
            
            score: counter,
             name: name,
            subject_id: id

        })
    }
  
    fetch('http://localhost:3000/game_sessions', objectConfig)
    .then(response => response.json())
    .then(data =>  {console.log(data)})
}

function winner(){

    document.querySelector('#timer').remove()
    document.querySelector('#question-div').remove()

     let winSign = document.createElement('h1')
     let newPlayerButton  = document.createElement('button')
     let tryAgainButton   = document.createElement('button')
     let body             = document.querySelector('body')


     winSign.innerText = "You Win! call 1-800-1234 for your prize!"
     newPlayerButton.innerText = "New Player"
     tryAgainButton.innerText  = 'Try again'

     winSign.setAttribute('id', 'youWin')
     newPlayerButton.setAttribute('id', 'newPlayer')
     tryAgainButton.setAttribute('id','tryAgain')

     body.append(winSign, tryAgainButton, newPlayerButton)

     tryAgainButton.addEventListener('click',() => startGame(winSign, name, tryAgainButton, newPlayerButton))
     newPlayerButton.addEventListener('click', () => welcomePage(winSign, tryAgainButton, newPlayerButton))
}
   
