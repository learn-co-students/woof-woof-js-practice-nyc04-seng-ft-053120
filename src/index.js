let dogBarDiv = document.querySelector("#dog-bar")
let dogInfoDiv = document.querySelector("#dog-info")
console.log(dogBarDiv)

let allDogs = []

fetch(`http://localhost:3000/pups`)
    .then(response => response.json())
    .then((dogData) => {
        allDogs = dogData
        dogData.forEach(doggo => displayDogName(doggo));
    })

function displayDogName(doggo) {
    let dogspan = document.createElement("span")
    dogspan.innerText = doggo.name
    dogspan.id = doggo.id
    dogspan.addEventListener('click', function (event) {
        showcaseDog(doggo)
    })
    dogBarDiv.append(dogspan)
}

function showcaseDog(dog) {
    dogInfoDiv.innerHTML = ""

    let image = document.createElement("img")
    image.src = dog.image
    let headerText = document.createElement("h2")
    headerText.innerText = dog.name
    let button = document.createElement("button")
    if (dog.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }
    dogInfoDiv.append(image)
    dogInfoDiv.append(headerText)
    dogInfoDiv.append(button)

    button.addEventListener('click', function(event) {
        dog.isGoodDog = !dog.isGoodDog
        if (dog.isGoodDog) {
            button.innerText = "Good Dog!"
        } else {
            button.innerText = "Bad Dog!"
        }
        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
    })
}