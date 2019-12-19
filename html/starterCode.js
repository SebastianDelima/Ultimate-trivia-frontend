document.addEventListener('DOMContentLoaded', ()=>{
    console.log("you are here")
    testFetch()
})


function testFetch(){
    fetch('http://localhost:3000/subjects')
    .then(response => response.json())
    .then(tests => console.log(tests))
}
