function fetchRiddles(name){

    let counter = 1
    let level = 0

     fetch('http://localhost:3000/subjects/11')
     .then(response => response.json())
     .then(subject  => displayRiddles(subject, counter, level, name))
     
 }
