function fetchEntertainment(name){

    let counter = 1
    let level = 0

     fetch('http://localhost:3000/subjects/12')
     .then(response => response.json())
     .then(subject  => displayEntertainment(subject, counter, level, name))
     
 }