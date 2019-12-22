document.addEventListener('DOMContentLoaded', ()=>{

    welcomePage()

})

function welcomePage(gameOverH1){

if(gameOverH1 !== undefined) {gameOverH1.remove()}

    let body             = document.querySelector('body')
    let welcomeDiv       = document.createElement('div')
    let mainHeader       = document.createElement('h1')
    let nameForm         = document.createElement('form')
    let nameInput        = document.createElement('input')
    let submitButton     = document.createElement('button')
    let nameInstruction  = document.createElement('h3')
    let arrow            = document.createElement('img')
   
    arrow.setAttribute('src', 'https://img.icons8.com/nolan/96/000000/arrow.png')
    arrow.classList.add('arrow')

    mainHeader.innerText      = "Trivia Master"
    nameInstruction.innerText = "Please insert your name to play"
    submitButton.innerText    = "St@rt g@me"

    body.appendChild(welcomeDiv)
    welcomeDiv.append(mainHeader,nameInstruction, arrow, nameForm)
    nameForm.append(nameInput, submitButton)

    submitButton.addEventListener('click',() => {

        let name = document.querySelector('input').value
        startGame(welcomeDiv, name)

      }
    )

   
    // $(welcome).click(function(){$(welcomeDiv).fadeOut('slow')})
}




function startGame(welcomeDiv, name){

    welcomeDiv.remove()

    let body           = document.querySelector('body')
    let buttonDiv      = document.createElement('div')
    let buttonHistory  = document.createElement('button')
    let buttonRiddles  = document.createElement('button')
    let buttonCaution  = document.createElement('button')
    let nameH1         = document.createElement('h2')
   
    buttonHistory.innerText = "History"
    buttonRiddles.innerText = "Riddles"
    buttonCaution.innerText = "Caution!"
    nameH1.innerText        = `Welcome ${name}; to start the game you must select a subject...if you dare.`

    buttonDiv.setAttribute('id', 'buttons')
    buttonHistory.setAttribute('id', 'history-button')
    buttonRiddles.setAttribute('id', 'riddle-button')
    buttonCaution.setAttribute('id', 'caution-button')
    nameH1.setAttribute('id', "name-text")

    body.appendChild(buttonDiv)
    buttonDiv.append(buttonHistory, buttonRiddles, buttonCaution, nameH1)
    document.querySelector('#history-button').addEventListener('click',() => {fetchHistory(name)})
    // $(body).click(function(){$(body).fadeOut('slow')})

}

function fetchHistory(name){
   let counter = 1
   let level = 0
    fetch('http://localhost:3000/subjects/2')
    .then(response => response.json())
    .then(subject  => displayHistoryQuestions(subject, counter, level, name))
    
}


function displayHistoryQuestions(subject, counter, level, name){
     
    if(document.querySelector('#buttons') !== null){
       document.querySelector('#buttons').remove()
    } else {
        document.querySelector('#timer').remove()
        document.querySelector('#question-div').remove()
    }

    let sec          = 10;
    let body         = document.querySelector('body')
    let timerDisplay = document.createElement('p')

    timerDisplay.setAttribute('id', 'timerDisplay')
    body.append(timerDisplay)
    
   let timer = setInterval(function(){

        document.getElementById('timerDisplay').innerText='00:'+sec;
        sec--;
        if (sec === 9){

            let body = document.querySelector('body')
        
            let questionName     = subject.questions[level].name
            let answers          = subject.answers.filter(answer => answer.question_id === subject.questions[level].id)
            let questionAns1     = answers[0].answer
            let question1Correct = answers[0].correct
            let questionAns2     = answers[1].answer
            let question2Correct = answers[1].correct
            let questionAns3     = answers[2].answer
            let question3Correct = answers[2].correct

            let timerDiv         = document.createElement('div')
            let levelCounter     = document.createElement('h4')
            let timerTitle       = document.createElement('h2')        
            let selectForm       = document.createElement('select')
            let questionDiv      = document.createElement('div')
            let questionNameNode = document.createElement('h1')
            let ans1Node         = document.createElement('option')
            let ans2Node         = document.createElement('option')
            let ans3Node         = document.createElement('option')
            
            timerDiv.setAttribute('id','timer')
            questionDiv.setAttribute('id', 'question-div')
            selectForm.setAttribute('id', 'choices')
            selectForm.setAttribute('multiple', 'multiple')
            questionNameNode.setAttribute('id', 'questionName')
            ans1Node.setAttribute('id', 'ans1')
            ans2Node.setAttribute('id', 'ans2')
            ans3Node.setAttribute('id', 'ans3')
            ans1Node.addEventListener('click',() => { if(question1Correct === true){clearInterval(timer), win(subject, counter, level)}else{clearInterval(timer),lose(subject, counter, name)}})
            ans2Node.addEventListener('click',() => { if(question2Correct === true){clearInterval(timer), win(subject, counter, level)}else{clearInterval(timer),lose(subject, counter, name)}})
            ans3Node.addEventListener('click',() => { if(question3Correct === true){clearInterval(timer), win(subject, counter, level)}else{clearInterval(timer),lose(subject, counter, name)}})
        
            levelCounter.innerText     = `Question: ${counter}`
            timerTitle.innerText       = 'Timer'
            questionNameNode.innerText = questionName
            ans1Node.innerText         = questionAns1
            ans2Node.innerText         = questionAns2
            ans3Node.innerText         = questionAns3
            
            timerDiv.append(levelCounter, timerTitle, timerDisplay, levelCounter)
            body.append(timerDiv, questionDiv)
            questionDiv.append(questionNameNode, selectForm)
            selectForm.append(ans1Node, ans2Node, ans3Node)
        
        }else if (sec < 0) {
           lose(counter)
            clearInterval(timer);
        }
    }, 1000);

}


function win(subject, counter, level){
    ++counter
    ++level
    displayHistoryQuestions(subject, counter, level)
    console.log('you win!')
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
    newPlayerButton.innerText = 'New player'
    tryAgainButton.innerText  = 'Try again'

    body.appendChild(gameOverH1)
    gameOverH1.append(tryAgainButton, newPlayerButton)

    tryAgainButton.addEventListener('click',() => startGame(gameOverH1, name))
    newPlayerButton.addEventListener('click', () => welcomePage(gameOverH1))

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
    // startGame(welcomeDiv, name)
}
   
