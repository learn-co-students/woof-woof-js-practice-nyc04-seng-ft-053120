const dogBarDiv = document.querySelector("#dog-bar")
const dogInfoDiv = document.querySelector("#dog-info")

fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then((pupArr) => {
        pupArr.forEach((singlePup) => {
            turnPuptoSpan(singlePup)
        })
    })

let turnPuptoSpan = (pupObj) => {
    let pupSpan = document.createElement("span")
    pupSpan.innerText = pupObj.name
    dogBarDiv.append(pupSpan)

    pupSpan.addEventListener("click", (evt) => {
        dogInfoDiv.innerHTML = ""
        renderPup(pupObj)
    })
}

let renderPup = (singlePup) => {
    // console.log("This is the pup we want to render, singlePup")
    let pupImg = document.createElement("img")
    let pupName = document.createElement("h2")
    let pupButton = document.createElement("button")
    pupImg.src = singlePup.image
    pupName.innerText = singlePup.name
    
    singlePup.isGoodDog ? pupButton.innerText = 'Good Dog!' : pupButton.innerText = 'Bad Dog!'

    // if (singlePup.isGoodDog) {
       //  pupButton.innerText = "Good Dog!"
    // } else { pupButton.innerText = "Bad Dog!"}

    dogInfoDiv.append(pupImg, pupName, pupButton)

    pupButton.addEventListener("click", (evt) => {
        
        singlePup.isGoodDog ? singlePup.isGoodDog = false : singlePup.isGoodDog = true
        
        // if (singlePup.isGoodDog) {
           // pupButton = false
        // } else { singlePup.isGoodDog = true}

    fetch(`http://localhost:3000/pups/${singlePup.id}`, {
        method: "PATCH",
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: singlePup.isGoodDog
        })
    })

    .then(res => res.json())
    .then((updatedPup) => {
        
        updatedPup.isGoodDog ? pupButton.innerText = 'Good Dog!' : pupButton.innerText = 'Bad Dog!'
        
        // if (updatedButton.isGoodDog) {
           // pupButton.innerText = "Good Dog!"
        // } else {pupButton.innerText = "Bad Dog!"}
    })
})
}