//stable elements 
const dogDivBar = document.querySelector("#dog-bar")
const dogInfo = document.querySelector("#dog-info")

fetch("http://localhost:3000/pups")
.then(res => res.json())
.then((dogArray) => {
    dogArray.forEach((singleDog) => {
        turnDogHTML(singleDog)
    })
})




let turnDogHTML = (dogObj) => {
    //<span>Mr. Bonkers</span>
    const spanDog = document.createElement("span")
    spanDog.innerHTML = dogObj.name
    dogDivBar.append(spanDog)

   spanDog.addEventListener("click", (evt) => {
       dogInfo.innerHTML = `<img src=${dogObj.image}>`
       const dogButton = document.createElement("button")
       dogObj.isGoodDog ? dogButton.innerText = "Good Dog!" : dogButton.innerText = "Bad Dog!"
       dogInfo.append(dogButton)
    

       dogButton.addEventListener("click", (evt) => {
           dogObj.isGoodDog ? dogObj.isGoodDog = false : dogObj.isGoodDog = true
           fetch(`http://localhost:3000/pups/${dogObj.id}`, {
               method: "PATCH",
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   isGoodDog: dogObj.isGoodDog
               })
           })
           .then(res => res.json())
           .then((updatedPup) => {
            updatedPup.isGoodDog ? dogButton.innerText = "Good Dog!" : dogButton.innerText = "Bad Dog!"
           })
       })
    })

   }



