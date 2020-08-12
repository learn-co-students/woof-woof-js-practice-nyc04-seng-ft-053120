let dogBarDiv = document.querySelector("div#dog-bar")
let dogInfoDiv = document.querySelector("#dog-info")
let bonusButton = document.querySelector("button#good-dog-filter") 

fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pupArr) => {
        pupArr.forEach((singlePup) => {
            turnPuptoSpan(singlePup)
        })
    })

let turnPuptoSpan = (pupObj) => {
    let outerDogSpan = document.createElement("span")
        outerDogSpan.innerText = pupObj.name
    
    dogBarDiv.append(outerDogSpan)

    outerDogSpan.addEventListener("click", (evt) => {
       renderPup(pupObj)
    })
}

let renderPup = (singlePup) => {
    // console.log("This is the pup we want to render, singlePup")
    let pupImg = document.createElement("img")
        pupImg.src = singlePup.image
    let pupName = document.createElement("h2")
        pupName.innerText = singlePup.name
    let pupButton = document.createElement("button")
        pupButton.innerText = singlePup.isGoodDog ? "Good Dog!" : "Bad Dog!"

    dogInfoDiv.append(pupImg, pupName, pupButton)

    pupButton.addEventListener("click", (evt) => {
        fetch(`http://localhost:3000/pups/${singlePup.id}`, {
            method: "PATCH",
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                isGoodDog: !dogObj.isGoodDog
            })
        })

    .then(res => res.json())
    .then((updatedPup) => {
        // UPDATING THE OBJECT IN MEMORY
        singlePup.isGoodDog = updatedPup.isGoodDog
        // UPDATING THE DOM
        pupButton.innerText = updatedPup.isGoodDog? "Good Boy!" : "Bad Dog!"
    })
})
}

// BONUS
bonusButton.addEventListener("click", (evt) => {
    let isTheButtonOn = bonusButton.innerText === "Filter good dogs: ON"

    fetch(`http://localhost:3000/pups`)
        .then(res => res.json())
        .then((allDoggies) => {

            dogBarDiv.innerHTML = ""

        if (isTheButtonOn){
            allDoggies.forEach((singlePup) => {
                turnPuptoSpan(singlePup)
            })

            bonusButton.innerText = "Filter good dogs: OFF"
        } else {
            allDoggies.forEach((singlePup) => {
                if(singlePup.isGoodDog{
                    turnPuptoSpan(singlePup)
                }
            })
            bonusButton.innerText = "Filter good dogs: ON"
        }
        })
})