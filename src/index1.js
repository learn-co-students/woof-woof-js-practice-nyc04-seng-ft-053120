//stable elements
let dogBar = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")


fetch("http://localhost:3000/pups")
.then(res => res.json())
.then(dogs => {
    dogs.forEach(singleDog => {
        turnDogIntoHTML(singleDog)
    });
})

let turnDogIntoHTML = (singleDog) => {
    let spanName = document.createElement("span")
    spanName.innerText = singleDog.name
    dogBar.append(spanName)

    dogInfo.addEventListener("click", (evt) => {
       
        evt.preventDefault()
        let imgOfDog = document.createElement("img")
        imgOfDog.src = singleDog.image

        let nameOfDog = document.createElement("h2")
        nameOfDog.innerText = singleDog.name

        let buttonName = document.createElement("button")
        
        if (singleDog.isGoodDog) {
            buttonName.innerText = "Good Dog!"
        } else {
            buttonName.innerText = "Bad Dog!"
        }

        dogInfo.append(imgOfDog,nameOfDog,buttonName)
    })

   dogBar.addEventListener("click", (evt) => {
        evt.preventDefault()

        fetch(`http://localhost:3000/pups/${singleDog.id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify({
               isGoodDog: singleDog.isGoodDog
                  
            })
        })
       .then( res => res.json())
       .then((updatedDog) => {
           updatedDog.isGoodDog ? buttonName.innerText = "Good Dog!" : dogButton.innerText = "Bad Dog!"
       })
    })
}