fetch('http://localhost:3000/pups')
.then(res => res.json())
.then(dogData => dogData.forEach(
         dog => renderPup(dog)
         )
        )

let dogContainer = document.querySelector('#dog-bar')
let dogInfo = document.querySelector('#dog-info')

function renderPup(dog) {
    let newSpan = document.createElement('span')
    newSpan.innerText = dog.name
    dogContainer.append(newSpan)

        let newImg = document.createElement('img')
        newImg.src = dog.image

        let newH2 = document.createElement('h2')
        newH2.innerText = dog.name

         let newButton = document.createElement('button')
         if (dog.isGoodDog == true ) {
         newButton.innerText = 'Good Dog!'}
         else {
             newButton.innerText = "Bad Dog!"
         }
         
         
    newSpan.addEventListener('click', (evt) => {
        dogInfo.append(newImg, newH2, newButton)
    })


    newButton.addEventListener('click', (evt) => {
        if (newButton.innerText == 'Good Dog!') {
            newButton.innerText = 'Bad Dog!'
            dog.isGoodDog = false
        }
        else {
            newButton.innerText = 'Good Dog!'
            dog.isGoodDog = true
        }

        fetch(`http://localhost:3000/pups/${dog.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isGoodDog: dog.isGoodDog
            })
        })
        .then(res => res.json())
        .then(dogData => console.log(dogData))
    })


let filterButton = document.querySelector('#good-dog-filter')

filterButton.addEventListener('click', (evt) => {
     if (filterButton.innerText == 'Filter good dogs: OFF'){
      filterButton.innerText = 'Filter good dogs: ON'
    }
   //Still have not figured out the Bonus:filter dog part of this lab     
})



    

}

