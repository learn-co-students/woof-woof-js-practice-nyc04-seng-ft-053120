let dogBar = document.querySelector("div#dog-bar")
let dogMainDiv= document.querySelector("#dog-info")

fetch(`http://localhost:3000/pups`)
.then(response => response.json())
.then(dogsArr => {
    dogsArr.forEach(singleDog =>{
        turnDogToSpan(singleDog)
    });

})

let turnDogToSpan = (dogObj) => {
    console.log(dogObj)

    let outerDogSpan = document.createElement("span")
    outerDogSpan.innerText = dogObj.name

    dogBar.append(outerDogSpan)

    outerDogSpan.addEventListener("click", (evt) => {
        renderMainDog(dogObj)
    })
}

// function turnDogToSpan(dogObj){
// }

let renderMainDog = (dogObj) => {
    console.log(dogObj)

    let dogImage = document.createElement("img")
        dogImage.src = dogObj.image
    let dogNameH2 = document.createElement("h2")
        dogNameH2.innerText = dogObj.name
    let dogButton = document.createElement("button")
        
    if(dogObj.isGoodDog){
        dogButton.innerText = "Good Dog"
    } else {
        dogButton.innerText = "Bad Dog"
    }
 
    //dogButton.innerText = dogObj.isGoodDog ? "Good Dog" : "Bad Dog"

        dogMainDiv.innerHTML = ""

        dogMainDiv.append(dogImage, dogNameH2, dogButton)

        dogButton.addEventListener("click", (evt) => {
            dogObj.isGoodDog = !dogObj.isGoodDog

            fetch(`http://localhost:3000/pups/${dogObj.id}`,{
                method: "PATCH",
                headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: !dogObj.isGoodDog
                })
            })
                .then(resp => resp.json())
                .then((updatedDog) => {
                    //UPDATING THE OBJECT IN MEMORY
                    dogButton.innerText = updatedDog.isGoodDog ? "Good Dog" : "Bad Dog"
                })
        })
    
}