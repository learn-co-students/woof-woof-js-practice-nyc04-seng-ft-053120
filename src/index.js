const dogBarDiv = document.querySelector('div#dog-bar');
const dogInfoDiv = document.querySelector('div#dog-info');
const dogFilterButton = document.querySelector('button#good-dog-filter');
const dogObjArray = [];

fetch('http://localhost:3000/pups')
.then(response => response.json())
.then(dogObjArrayData => {
    dogObjArrayData.forEach(dogObj => {
        dogObjArray.push(dogObj)
        turnDogObjToHTML(dogObj)
    });
});

function turnDogObjToHTML(dogObj) {
    let dogSpan = document.createElement('span')
        dogSpan.innerText = dogObj.name

    dogBarDiv.append(dogSpan);

    dogSpan.addEventListener('click', e => {
        dogInfoDiv.innerText = ""

        let dogImg = document.createElement('img')
            dogImg.src = dogObj.image

        let dogH2 = document.createElement('h2')
            dogH2.innerText = dogObj.name

        let dogButton = document.createElement('button')
            dogObj.isGoodDog ? dogButton.innerText = 'Good Dog!' : dogButton.innerText = 'Bad Dog!'

        dogInfoDiv.append(dogImg, dogH2, dogButton)

        dogButton.addEventListener('click', e => {
            dogObj.isGoodDog ? dogObj.isGoodDog = false : dogObj.isGoodDog = true

            fetch(`http://localhost:3000/pups/${dogObj.id}`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    isGoodDog: dogObj.isGoodDog
                })
            })
            .then(response => response.json())
            .then(updatedDogObj => updatedDogObj.isGoodDog ? dogButton.innerText = 'Good Dog!' : dogButton.innerText = 'Bad Dog!' )
        });
        
    });
};

dogFilterButton.addEventListener('click', e => {
    dogBarDiv.innerText = ''
    if (dogFilterButton.innerText.includes('OFF')) {
        dogFilterButton.innerText = 'Filter good dogs: ON'
        dogObjArray.forEach((dogObj) => {
            if (dogObj.isGoodDog) {
                turnDogObjToHTML(dogObj)
            }
        })
    } else {
        dogFilterButton.innerText = 'Filter good dogs: OFF'
        dogObjArray.forEach((dogObj) => turnDogObjToHTML(dogObj))
    }
})