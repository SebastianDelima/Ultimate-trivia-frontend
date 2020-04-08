


function fetchHistory(name){

    let counter = 1
    let level = 0

     fetch('http://localhost:3000/subjects/1')
     .then(response => response.json())
     .then(subject  => displayQuestions(subject, counter, level, name))
     
 }
 

 
