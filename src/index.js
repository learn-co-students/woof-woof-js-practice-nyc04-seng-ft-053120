
const dogDiv = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")

fetch("http://localhost:3000/pups")
  
   .then (response => response.json())
   .then((pups) => {
    pups.forEach(singlePup => {
        console.log(singlePup)
        turnDogTohtml(singlePup) 
          })
        })
         // 1) Create the outer box

        let turnDogTohtml = (pupObj) => {
        let spanElement = document.createElement("span")
             
          spanElement.innerHTML = `${pupObj.name}`
           dogDiv.append(spanElement)

           spanElement.addEventListener('click', () => {
           
           dogInfo.innerHTML = 
           `<img src=${pupObj.image}>
           <h2>${pupObj.name}</h2>
           <button class = "dog-button">${pupObj.isGoodDog ? "Good Dog!" : "Bad Dog!"} </button>`
             
           const dogButton = document.querySelector(".dog-button")
                // console.log(dogButton)
              
                dogButton.addEventListener("click", (evt) => {
                  //console.log("check")
                  console.log(evt.target)
                   //debugger
                   
                  fetch(`http://localhost:3000/pups/${pupObj.id}`, {
                    method: "PATCH",
                    headers: {
                      'Content-Type': 'application/json',

                    },
                    body: JSON.stringify({
                      isGoodDog: evt.target.innerText === "Good Dog!" ? false : true 
                    })
                  })
                  .then(r => r.json()) // callback 
                  .then((updatedDogObj) => {
                    //console.log(updatedDogObj)
                    evt.target.innerText = updatedDogObj.isGoodDog ? "Good Dog!" : "Bad Dog!" 
                    
                  })

                  
                })
              
            
             

            })
              
           }