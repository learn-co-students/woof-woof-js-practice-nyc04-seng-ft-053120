const dogNameDiv = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const gDButton = document.querySelector('#good-dog-filter')
const dogArr = []

console.log('It\'s linked')

fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    .then((dogArray) => {
        dogArray.forEach((pup) => {
            convertDogToHTML(pup)
            dogArr.push(pup)
        })
    })

const convertDogToHTML = (singlePup) => {
    const pupSpan = document.createElement('span')
    pupSpan.innerText = singlePup.name
    dogNameDiv.append(pupSpan)


    pupSpan.addEventListener('click', (evt) => {
        dogInfoDiv.innerHTML = ""

        const dogImg = document.createElement('img')
        dogImg.src = singlePup.image
        const dogH2 = document.createElement('h2')
        dogH2.innerText = singlePup.name
        const dogButton = document.createElement('button')
        singlePup.isGoodDog ? dogButton.innerText = "Best Dog Ever!" : dogButton.innerText = "Worst Dog Ever!"

        dogInfoDiv.append(dogImg, dogH2, dogButton)

        dogButton.addEventListener('click', (evt) => {
            singlePup.isGoodDog ? singlePup.isGoodDog = false : singlePup.isGoodDog = true
            fetch(`http://localhost:3000/pups/${singlePup.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: singlePup.isGoodDog
                })
            })
                .then((response) => response.json())
                .then((updatedDog) => {
                    updatedDog.isGoodDog ? dogButton.innerText = "Best Dog Ever!" : dogButton.innerText = "Worst Dog Ever!"

                })
        })
    })
}


gDButton.addEventListener('click', (evt) => {
    dogNameDiv.innerHTML = ""
    if(evt.target.innerText === "Filter good dogs: OFF") {
        evt.target.innerText = "Filter good dogs: ON"
        const filterDog = dogArr.filter(obj => obj.name === "Snooper Pooper")
        filterDog.forEach((singlePup) =>{
            convertDogToHTML(singlePup)
        })
    } else {
        evt.target.innerText = "Filter good dogs: OFF"
        dogArr.forEach((singlePup) => {
            convertDogToHTML(singlePup)
        })
    }
})