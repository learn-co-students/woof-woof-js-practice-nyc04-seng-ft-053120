const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById('dog-info')
const filterGoodDoggos = document.getElementById('good-dog-filter')
let doggosArray = [];

fetch("http://localhost:3000/pups")
  .then((response) => response.json())
  .then((pupsArray) => {
      pupsArray.forEach((singlePup) => {
      convertToHTML(singlePup)
      doggosArray.push(singlePup)
    })
  });
  
let convertToHTML = (singlePup) => {
    let emptySpan = document.createElement('span')
    emptySpan.innerText = singlePup.name
    dogBarDiv.append(emptySpan)

    emptySpan.addEventListener("click", (evt) => {
        dogInfoDiv.innerHTML = `<img src=${singlePup.image}>
        <h2>${singlePup.name}</h2>`
        let doggoButton = document.createElement('button')

        singlePup.isGoodDog ? doggoButton.innerText = "Good Dog!" : doggoButton.innerText = "Bad Dog!"
        dogInfoDiv.append(doggoButton)

        doggoButton.addEventListener("click", (evt) => {
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

    // BONUS FILTER GOOD DOGS
    // filterGoodDoggos.addEventListener("click", (evt) => {
    //     if (filterGoodDoggos.innerText == "Filter good dogs: OFF") {
    //         filterGoodDoggos.innerText = "Filter good dogs: ON"
    //         doggosArray.forEach((dogObj) => {
    //             if (dogObj.isGoodDog) {
    //                 convertToHTML(dogObj)
    //             }
    //         })
    //     } else {
    //         filterGoodDoggos.innerText = "Filter good dogs: OFF"
    //         doggosArray.forEach((dogObj) => convertToHTML(dogObj))
    //     }
    // })