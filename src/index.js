const dogBarDiv = document.querySelector("div#dog-bar")
const dogInfoDiv = document.querySelector("div#dog-info")
const dogArrayObj = []
const dogFilterBtn = document.querySelector("#good-dog-filter")

fetch("http://localhost:3000/pups")
    .then(response => response.json())
    .then(pupsArrayObj => {
        
        pupsArrayObj.forEach(pupObj => {
            dogArrayObj.push(pupObj)
            addPupToHtml(pupObj)
        });
    })

function addPupToHtml(pupObj){

    const pupSpan = document.createElement("span")
        pupSpan.innerText = pupObj.name
    dogBarDiv.append(pupSpan)

    pupSpan.addEventListener("click", evt => {
        dogInfoDiv.textContent = ""
        const dogImg = document.createElement("img")
            dogImg.src = pupObj.image
        const dogH2 = document.createElement("h2")
            dogH2.innerText = pupObj.name
        const dogButton = document.createElement("button")
            if (pupObj.isGoodDog) {
                dogButton.innerText = "Good Dog!"
            }else {
                dogButton.innerText = "Bad Dog!"
            }
        dogInfoDiv.append(dogImg, dogH2, dogButton)
        
        dogButton.addEventListener("click", evt => {
            pupObj.isGoodDog ? (pupObj.isGoodDog = false) : (pupObj.isGoodDog = true)

            fetch(`http://localhost:3000/pups/${pupObj.id}`,{
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    isGoodDog: pupObj.isGoodDog
                })
            })
                .then(response => response.json())
                .then(updatedPup =>{
                    // conditional, (? === if), what you want to happen if its true, (: === else), this event happens
                    updatedPup.isGoodDog ? dogButton.innerText = "Good Dog!" : dogButton.innerText = "Bad Dog!"
                })
               
        })
    });
}

dogFilterBtn.addEventListener("click", evt => {
    // evt.target doesnt approve of id theft
    dogBarDiv.innerHTML = ""
    if (evt.target.innerText === "Filter good dogs: OFF"){
         evt.target.innerText = "Filter good dogs: ON"
         const filterDog = dogArrayObj.filter(obj => obj.isGoodDog)
         filterDog.forEach(dogo => addPupToHtml(dogo))

    }else { 
        evt.target.innerText = "Filter good dogs: OFF"
        dogArrayObj.forEach(dogo => addPupToHtml(dogo))
    }

})