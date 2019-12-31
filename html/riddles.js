
function fetchRiddles(name){

    let counter = 1
    let level = 0

     fetch('http://localhost:3000/subjects/11')
     .then(response => response.json())
     .then(subject  => displayRiddles(subject, counter, level, name))
     
 }

 function displayRiddles(subject, counter, level, name){
     
    if(document.querySelector('#buttons') !== null){
       document.querySelector('#buttons').remove()
    } else {
        document.querySelector('#timer').remove()
        document.querySelector('#question-div').remove()
    }

    let sec          = 30;
    let body         = document.querySelector('body')
    let timerDisplay = document.createElement('p')

    timerDisplay.setAttribute('id', 'timerDisplay')
    body.append(timerDisplay)
    
   let timer = setInterval(function(){

        document.getElementById('timerDisplay').innerText='00:'+sec;
        sec--;
        if (sec === 29){

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
            let selectForm       = document.createElement('form')
            let questionDiv      = document.createElement('div')
            let questionNameNode = document.createElement('h1')
            let ans1Node         = document.createElement('button')
            let ans2Node         = document.createElement('button')
            let ans3Node         = document.createElement('button')
            
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

 