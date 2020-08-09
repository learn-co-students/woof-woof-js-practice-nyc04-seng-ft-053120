const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById('dog-info')

fetch("http://localhost:3000/pups")
  .then((response) => response.json())
  .then((pupsArray) => {
      pupsArray.forEach((singlePup) => {
      convertToHTML(singlePup)
    })
  });
  
let convertToHTML = (singlePup) => {
    let emptySpan = document.createElement('span')
    // emptySpan.className = "doggo-span"
    emptySpan.innerText = singlePup.name
    dogBarDiv.append(emptySpan)
    console.log(dogBarDiv)

    emptySpan.addEventListener("click", (event) => {
        dogInfoDiv.innerHTML = `<img src=${singlePup.image}>
        <h2>${singlePup.name}</h2>`
        let doggoButton = document.createElement('button')

        singlePup.isGoodDog ? doggoButton.innerText = "Good Dog!" : doggoButton.innerText = "Bad Dog!"
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
  