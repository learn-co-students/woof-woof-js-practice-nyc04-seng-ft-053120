let filterDiv = document.querySelector("#filter-div")
let filterButton = document.querySelector("#good-dog-filter")
let barDiv = document.querySelector("#dog-bar")
let summaryDiv = document.querySelector("#dog-summary-container")
let infoDiv = document.querySelector("#dog-info")
let dogsArray = []

fetch(`http://localhost:3000/pups`)
  .then(response => response.json())
  .then(dogObjArrayData => {
    dogObjArrayData.forEach(dogObj => {
        dogsArray.push(dogObj)
        turnDogIntoHTML(dogObj)
    });
});


  function turnDogIntoHTML(dogObj){
      let dogSpan = document.createElement("span")
      dogSpan.innerHTML = dogObj.name
      barDiv.append(dogSpan)

      dogSpan.addEventListener("click", (event) => {
        infoDiv.innerHTML = `<img src=${dogObj.image}> 
        <h2>${dogObj.name}</h2> 
        <button>${dogObj.isGoodDog} Dog!</button>`

        let infoButton = infoDiv.querySelector("button")
        if (dogObj.isGoodDog === true) {
            infoButton.innerText = "Good Dog"
        }
        else{
            infoButton.innerText = "Bad Dog"
        }


        infoButton.addEventListener("click", (event) => {
            dogObj.isGoodDog = !dogObj.isGoodDog
            infoButton.innerText =  infoButton.innerText === "Good Dog"? "Bad Dog" : "Good Dog"
            

            fetch(`http://localhost:3000/pups/${dogObj.id}`, {
                method : "PATCH",
                headers : {
                    "Content-type" : `application/json`
                },
                body : JSON.stringify({
                    isGoodDog : dogObj.isGoodDog
                })
            })
                .then(response => response.json())
                .then(updatedDog => {
                    updatedDog.isGoodDog ? infoButton.innerText = 'Good Dog!' : infoButton.innerText = 'Bad Dog!'
                })
            });
        })
        }

        filterButton.addEventListener('click', (event) => {
            barDiv.innerText = ''
            if (filterButton.innerText.includes('OFF')) {
                filterButton.innerText = 'Filter good dogs: ON'
                dogsArray.forEach((dogObj) => {
                    if (dogObj.isGoodDog) {
                        turnDogIntoHTML(dogObj)
                    }
                })
            } else {
                filterButton.innerText = 'Filter good dogs: OFF'
                dogsArray.forEach((dogObj) => turnDogIntoHTML(dogObj))
            }
        }) 