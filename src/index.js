const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById('dog-info')
const dogFilterButton = document.getElementById('good-dog-filter')
const doggoArray = []


fetch("http://localhost:3000/pups")
  .then((response) => response.json())
  .then((pupsArray) => {
      pupsArray.forEach((singlePup) => {
      convertToHTML(singlePup)
      doggoArray.push(singlePup)
    })
  });


let convertToHTML = (singlePup) => {
    let emptySpan = document.createElement('span')
    emptySpan.className = "doggo-span"
    emptySpan.innerText = singlePup.name
    dogBarDiv.append(emptySpan)
   
    emptySpan.addEventListener("click", (event) => {
        dogInfoDiv.innerHTML = `<img src=${singlePup.image}>
        <h2>${singlePup.name}</h2>`
        let doggoButton = document.createElement('button')
        singlePup.isGoodDog ? doggoButton.innerText = "Good Dog!" : doggoButton.innerText = "Bad Dog!"
        //first thing is the if, if condition needs to evaluate to true to execute, so if
        //singlepup.isGoodDog is true, you will do what comes next after the question park
        //if the condition is false, you will do teh second thing, 

        dogInfoDiv.append(doggoButton)
        doggoButton.addEventListener("click", (event) => {
            singlePup.isGoodDog ? singlePup.isGoodDog = false : singlePup.isGoodDog = true
            fetch(`http://localhost:3000/pups/${singlePup.id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'Application/json'
                }, 
                body: JSON.stringify({
                    isGoodDog: singlePup.isGoodDog
                })
            })
            .then(res => res.json())
            .then((updatedButton) => {
                // UPDATING WHAT THE USER SEES ON THE DOM
                updatedButton.isGoodDog ? doggoButton.innerText = "Good Dog!" : doggoButton.innerText = "Bad Dog!"
            })
        })
    })
  } // end of the convertToHTML method

  dogFilterButton.addEventListener('click', (event) => {
    dogBarDiv.innerHTML = ""
    if (event.target.innerText === "Filter good dogs: OFF") {
        event.target.innerText = "Filter good dogs: ON"
        const filterDog = doggoArray.filter(object => object.isGoodDog) //putting filter in dogs
        filterDog.forEach(dog => convertToHTML(dog))
    } else {
        event.target.innerText = "Filter good dogs: OFF"
        doggoArray.forEach((singlePup) => {
            convertToHTML(singlePup)
            
        })
    }
      
  })