let dogBar = document.querySelector("div#dog-bar")
    //console.log(dogBar)  make sure it runs properly
let dogMainDiv = document.querySelector("#dog-info")
let bonusButton = document.querySelector("button#good-dog-filter")

fetch('http://localhost:3000/pups')
    .then(res => res.json())
    //.then(console.log(dogsArr))
    .then((dogsArr) => {
        dogsArr.forEach((singleDog) => {
            turnDogToSpan(singleDog)
        })
    })
let turnDogToSpan = (dogObj) => {
    //console.log(dogObj)
    let outerDogSpan = document.createElement("span")
    outerDogSpan.innerText = dogObj.name
    dogBar.append(outerDogSpan)
    outerDogSpan.addEventListener("click", (evt) => {
        // console.log(dogObj) make sure we have click access
        //build a helper method
        renderMainDog(dogObj)
    })
}
let renderMainDog = (dogObj) => {
    // console.log(dogObj)
    let dogImage = document.createElement("img")
    dogImage.src = dogObj.image
    let dogNameH2 = document.createElement("h2")
    dogNameH2.innerText = dogObj.name
        //boolean condition for dogButton
    let dogButton = document.createElement("button")
    if (dogObj.isGoodDog) {
        dogButton.innerText = "Best Dog"
    } else {
        dogButton.innerText = "Room for Improvement Dog"
    }
    //console.log(dogButton)
    //before we append element,we clear out dogmaindiv innerHTML
    //so now i can only see one dog showing up at one time
    dogMainDiv.innerHTML = ""
        //slap Element into Dom
    dogMainDiv.append(dogImage, dogNameH2, dogButton)

    dogButton.addEventListener("click", (evt) => {
        //console.log(evt.target, dogObj)
        //dogObj.isGoodDog = !dogObj.isGoodDog
        fetch(`http://localhost:3000/pups/${dogObj.id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !dogObj.isGoodDog
                })
            })
            .then(res => res.json())
            .then((updatedDog) => {
                // update obj in meory
                // dogObj.isGoodDog = !dogObj.isGoodDog
                dogObj.isGoodDog = updatedDog.isGoodDog

                // objectInMemory.key += NumToIncrement

                // update dom
                dogButton.innerText = updatedDog.isGoodDog ? "Best Dog" : "Room For Improvement Dog"
            })
    })

}


bonusButton.addEventListener("click", (evt) => {
    let isTheButtonOn = bonusButton.innerText === "Filter good dogs: ON"

    fetch(`http://localhost:3000/pups`)
        .then(res => res.json())
        .then((allDoggies) => {

            dogBar.innerHTML = ""

            if (isTheButtonOn) {

                allDoggies.forEach((singleDog) => {
                    turnDogToSpan(singleDog)
                })

                bonusButton.innerText = "Filter good dogs: OFF"

            } else {

                allDoggies.forEach((singleDog) => {
                    if (singleDog.isGoodDog) {
                        turnDogToSpan(singleDog)
                    }
                })
                bonusButton.innerText = "Filter good dogs: ON"

            }
        })
})