const dogBarDiv = document.querySelector("#dog-bar")
const dogInfoDiv = document.querySelector("#dog-info")
const filterDogsButton = document.querySelector("#good-dog-filter")

filterDogsButton.value = "OFF"

filterDogsButton.addEventListener("click", (evt) => {
  if (filterDogsButton.value === "ON") {
    filterDogsButton.innerText = "Filter good dogs: OFF"
    filterDogsButton.value = "OFF"
  }
  else {
    filterDogsButton.innerText = "Filter good dogs: ON"
    filterDogsButton.value = "ON"
  }
})

const renderDogInfo = (dogObj) => {

  console.log(dogObj)

  dogInfoDiv.innerHTML = ""

  const pupImage = document.createElement("img")
  pupImage.src = dogObj.image

  const pupH2 = document.createElement("h2")
  pupH2.innerText = dogObj.name

  const pupGoodBadButton = document.createElement("button")
  pupGoodBadButton.innerText = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"
  pupGoodBadButton.addEventListener("click", (evt) => {
    evt.preventDefault()
    dogObj.isGoodDog = !dogObj.isGoodDog
    pupGoodBadButton.innerText = dogObj.isGoodDog ? "Good Dog!" : "Bad Dog!"

    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ isGoodDog: dogObj.isGoodDog })
    }

    fetch(`http://localhost:3000/pups/${dogObj.id}`, options)
      .then(res => res.json())
      .then(pupObj => {
        renderDogInfo(pupObj)
      })
  })

  dogInfoDiv.append(pupImage)
  dogInfoDiv.append(pupH2)
  dogInfoDiv.append(pupGoodBadButton)
}

fetch('http://localhost:3000/pups')
  .then(res => res.json())
  .then(pupsArr => {

    pupsArr.forEach(pup => {

      const pupSpan = document.createElement("span")
      pupSpan.innerText = pup.name
      pupSpan.addEventListener("click", (evt) => {
        renderDogInfo(pup)
      })

      filterDogsButton.addEventListener("click", (evt) => {
        if (!pup.isGoodDog) {
          if (filterDogsButton.value === "OFF") { pupSpan.style.display = "" }
          if (filterDogsButton.value === "ON") { pupSpan.style.display = "none" }
        }
      })

      dogBarDiv.append(pupSpan)

    });

    renderDogInfo(pupsArr[0])
  })