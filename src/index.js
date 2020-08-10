// Stable Elements
const dogFilterButton = document.getElementById('good-dog-filter');
const dogBar = document.getElementById('dog-bar');
const dogInfoDiv = document.getElementById('dog-info');

const BASE_URL = 'http://localhost:3000/pups';

const allPups = () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((pupArray) => {
      dogBar.innerHTML = '';
      pupArray.forEach((pup) => {
        createDogBar(pup);
      });
    });
};

const goodPups = () => {
  fetch(BASE_URL)
    .then((response) => response.json())
    .then((pupArray) => {
      dogBar.innerHTML = '';
      const goodPupArray = pupArray.filter((pup) => pup.isGoodDog);
      goodPupArray.forEach((pup) => {
        createDogBar(pup);
      });
    });
};

const createDogBar = (pup) => {
  const pupSpan = document.createElement('span');
  pupSpan.innerText = pup.name;
  dogBar.append(pupSpan);

  pupSpan.addEventListener('click', (event) => {
    createDogDiv(pup);
  });
};

const createDogDiv = (pup) => {
  dogInfoDiv.innerHTML = '';

  const image = document.createElement('img');
  image.src = pup.image;

  const name = document.createElement('h2');
  name.innerText = pup.name;

  const button = document.createElement('button');
  isGoodDogButton(pup, button);

  dogInfoDiv.append(image, name, button);

  button.addEventListener('click', (event) => {
    const isGoodDog = !pup.isGoodDog;

    const attributePatch = {
      isGoodDog,
    };

    fetch(`${BASE_URL}/${pup.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(attributePatch),
    })
      .then((response) => response.json())
      .then((updatedPup) => {
        createDogDiv(updatedPup);
      });
  });
};

const isGoodDogButton = (pup, button) => {
  if (pup.isGoodDog === true) {
    button.innerText = 'Good Dog!';
  } else {
    button.innerText = 'Bad Dog!';
  }
};

dogFilterButton.addEventListener('click', (event) => {
  if (dogFilterButton.innerText === 'Filter good dogs: ON') {
    dogFilterButton.innerText = 'Filter good dogs: OFF';
    allPups();
  } else {
    dogFilterButton.innerText = 'Filter good dogs: ON';
    goodPups();
  }
});

allPups();
