const dogBarDiv = document.querySelector("#dog-bar");
const goodDogFilterBtn = document.querySelector("#good-dog-filter");
const filterDiv = document.querySelector("#filter-div");
const dogSummaryContainerDiv = document.querySelector("#dog-summary-container");
const dogInfoDiv = document.querySelector("#dog-info");

// On page load, make a fetch to get all the pup objects, add a span with the pup's name to the dog bar
clearDogBarDivAndFetchDogs();

function goodDogFilterOn() {
  // Return true if goodDogFilter is On, false if it is not
  if (goodDogFilterBtn.innerText === "Filter good dogs: ON") {
    return true;
  } else {
    return false;
  }
}

function changeDogFilter() {
  // Change dog filter on ON if it is OFF, and vice versa
  if (goodDogFilterOn()) {
    goodDogFilterBtn.innerText = "Filter good dogs: OFF"
  } else {
    goodDogFilterBtn.innerText = "Filter good dogs: ON"
  }
}

function clearDogBarDivAndFetchDogs() {
  dogBarDiv.innerHTML = "";

  fetch('http://localhost:3000/pups')
  .then(response => response.json())
  .then(pupObjectArr => {
    let dogArr = pupObjectArr;
    // if the goodDogFilter is on then fetch only the good dogs
    if (goodDogFilterOn()) {
      dogArr = pupObjectArr.filter(pupObject => pupObject.isGoodDog);
    } 
    dogArr.forEach(pupObject => turnIntoHTMLAndSlapOnDOM(pupObject))
  });
}


function turnIntoHTMLAndSlapOnDOM(pupObject) {
  let pupID = pupObject.id;
  let pupImage = pupObject.image;
  let pupName = pupObject.name;
  let pupIsGoodDog = pupObject.isGoodDog;
  let goodOrBadButton = document.createElement("button");

  function changeGoodOrBadButtonText() {
    if (pupIsGoodDog) {
      goodOrBadButton.innerText = "Good Dog!"
    } else if (!pupIsGoodDog) {
      goodOrBadButton.innerText = "Bad Dog!"
    }
  }
  
  changeGoodOrBadButtonText();

  let pupNameSpan = document.createElement("span");
      pupNameSpan.innerText = pupName;
      dogBarDiv.append(pupNameSpan);

  // When a user clicks on a pup's span in the dog bar, that pup's info (image, name, and isGoodDog status) should show up in the div with the id of "dog-info". 
  pupNameSpan.addEventListener("click", evt => {
    dogInfoDiv.innerHTML = `
      <img src="${pupImage}">
      <h2>${pupName}</h2>
    `;
    dogInfoDiv.append(goodOrBadButton);
  })

  // When a user clicks the Good Dog/Bad Dog button, two things should happen:
  goodOrBadButton.addEventListener("click", evt => {
    pupIsGoodDog = !pupIsGoodDog
    
    // The corresponding pup object in the database should be updated to reflect the new isGoodDog value
    fetch(`http://localhost:3000/pups/${pupID}`, {
      method: 'PATCH',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "isGoodDog": pupIsGoodDog
      })
    })
      .then(response => response.json())
      .then(newPupObject => {
        // The button's text should change from Good to Bad or Bad to Good
        changeGoodOrBadButtonText();
        clearDogBarDivAndFetchDogs();
      });
  })
}


goodDogFilterBtn.addEventListener("click",(evt) => {
  changeDogFilter();
  clearDogBarDivAndFetchDogs();
})