
function fetchEntertainment(name){

    let counter = 1
    let level   = 0

     fetch('http://localhost:3000/subjects/3')
     .then(response => response.json())
     .then(subject  => displayQuestions(subject, counter, level, name))
     
 }

 
