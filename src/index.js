const dogBar = document.getElementById('dog-bar');
const dogInfo = document.getElementById('dog-info');
const dogFilterB = document.getElementById('good-dog-filter');

addDogsToDogBar();
dogFilterB.addEventListener('click', toggleFilter);

function toggleFilter(e) {
  const isOff = isFilterOff();
  dogBar.innerHTML = ""
  if (isOff) {
    addGoodDogsToDogBar();
    dogFilterB.textContent = "Filter good dogs: ON";
  } else {
    addDogsToDogBar();
    dogFilterB.textContent = "Filter good dogs: OFF";
  }
}

function isFilterOff() {
  return dogFilterB.textContent.includes("OFF") ? true : false;
}

function addDogsToDogBar() {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => dogs.forEach(dog => addDogToDogBar(dog)));
}

function addGoodDogsToDogBar() {
  console.log('add good dogs to dog bar')
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(dogs => { 
      const goodDogs = filterGoodDogs(dogs);
      goodDogs.forEach(dog => addDogToDogBar(dog));
    })
}

function addDogToDogBar(dog) {
  const dogSpan = createDogSpan(dog);
  dogSpan.dataset.dogId = dog.id;
  dogSpan.style.cursor = "pointer";
  dogSpan.addEventListener('click', showDog);
  dogBar.append(dogSpan);
}

function createDogSpan(dog) {
  const span = document.createElement('span');
  span.textContent = dog.name;
  return span;
}

function showDog(e) {
  dogId = e.target.dataset.dogId;

  fetch(`http://localhost:3000/pups/${dogId}`)
    .then(res => res.json())
    .then(dog => addDogToDogInfo(dog));
}

function addDogToDogInfo(dog) {
  dogInfo.innerHTML = "";

  img = document.createElement('img');
  img.src = dog.image;

  h2 = document.createElement('h2');
  h2.textContent = dog.name;

  button = document.createElement('button');
  button.textContent = dog.isGoodDog ? "Bad Dog" : "Good Dog";
  button.dataset.dogId = dog.id;
  button.addEventListener('click', toggleGoodBad);

  dogInfo.append(img, h2, button);
} 

function toggleGoodBad(e) {
  const dogId = e.target.dataset.dogId;
  const buttonText = e.target.textContent;
  const isGood = buttonText.includes("Good") ? true : false;
  
  const patchConfig = {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      isGoodDog: isGood
    })
  }

  fetch(`http://localhost:3000/pups/${dogId}`, patchConfig)
    .then(res => res.json())
    .then(dog => addDogToDogInfo(dog))
    .then(_ => updateDogBar());
}

function updateDogBar() {
  dogBar.innerHTML = ""
  if (isFilterOff()) {
    addDogsToDogBar();
  } else {
    addGoodDogsToDogBar();
  }
}

function filterGoodDogs(dogs) {
  return dogs.filter(dog => dog.isGoodDog);
}