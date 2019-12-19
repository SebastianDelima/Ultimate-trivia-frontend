document.addEventListener('DOMContentLoaded', ()=>{
    console.log("you are here")
    starter()
})


function starter(){
    document.querySelector('#history-button').addEventListener('click', fetchHistory)

}

function fetchHistory(){
   let counter = 1
   let level = 0
    fetch('http://localhost:3000/subjects/5')
    .then(response => response.json())
    .then(subject  => displayHistoryQuestions(subject, counter, level))
    
}


function displayHistoryQuestions(subject, counter, level){

    document.querySelector('#buttons').remove()

    let sec = 10;
    let body = document.querySelector('body')
    let timerDisplay = document.createElement('p')
    timerDisplay.setAttribute('id', 'timerDisplay')
    body.append(timerDisplay)
    
    let timer = setInterval(function(){
        document.getElementById('timerDisplay').innerText='00:'+sec;
        sec--;
        if (sec === 9){

            let body = document.querySelector('body')
        
            let questionName     = subject.questions[level].name
            let questionAns1     = subject.questions[level].answer1
            let questionAns2     = subject.questions[level].answer2
            let questionAns3     = subject.questions[level].answer3

            let timerDiv         = document.createElement('div')
            let levelCounter     = document.createElement('div')
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
        

            levelCounter.innertext     = `Question: ${counter}`
            timerTitle.innerText       = 'Timer'
            questionNameNode.innerText = questionName
            ans1Node.innerText         = questionAns1
            ans2Node.innerText         = questionAns2
            ans3Node.innerText         = questionAns3
            
            
            timerDiv.append(levelCounter, timerTitle, timerDisplay)
            body.appendChild(timerDiv)
            body.appendChild(questionDiv)
            questionDiv.append(questionNameNode, selectForm)
            selectForm.append(ans1Node, ans2Node, ans3Node)
        
        }else if (sec < 0) {
           lose()
            clearInterval(timer);
        }
    }, 1000);
    
}

function lose(){
    console.log("you lose!")
}