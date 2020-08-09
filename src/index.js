const dogBarDiv = document.getElementById("dog-bar")
const dogInfoDiv = document.getElementById('dog-info')
const filterGoodDoggos = document.getElementById('good-dog-filter')
const doggosArray = [];

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
        dogInfoDiv.innerHTML = ""
        const dogImg = document.createElement("img")
            dogImg.src = singlePup.image
        const dogH2 = document.createElement("h2")
            dogH2.innerText = singlePup.name
        const doggoButton = document.createElement('button')
            singlePup.isGoodDog ? doggoButton.innerText = "Good Dog!" : doggoButton.innerText = "Bad Dog!"

        dogInfoDiv.append(dogImg, dogH2, doggoButton)
        
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
    filterGoodDoggos.addEventListener("click", evt => {
        dogBarDiv.innerHTML = "" // CLEARING DOGBARDIV
        if (evt.target.innerText === "Filter good dogs: OFF") {
             evt.target.innerText = "Filter good dogs: ON"  // CHANGE INNER TEXT
             const filterDog = doggosArray.filter(obj => obj.isGoodDog) // PUT FILTER DOGGOS IN AN ARRAY VARIABLE
             filterDog.forEach(dogo => convertToHTML(dogo))   // CONVERT FILTERED DOGGOS TO HTML
    
        }else { 
            evt.target.innerText = "Filter good dogs: OFF"    
                pupsArray.forEach((singlePup) => {
                    convertToHTML(singlePup)
                    doggosArray.push(singlePup)
              })
        }
    })