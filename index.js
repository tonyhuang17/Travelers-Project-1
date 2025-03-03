// let characters = [];
// let matchingCharacters = [];
// const charactersList = document.querySelector("#charactersList")

// document.addEventListener('DOMContentLoaded', getCharacters)

// async function getCharacters() {
//   let url = 'http://localhost:9001/api/characters';

//   try {
//     const fetchedCharacters = await fetch(url)
//       .then(res => res.json())
//     characters.push(...fetchedCharacters);
//   }
//   catch (ex) {
//     console.error("Error reading characters.", ex.message);
//   }
//   console.log("All the characters are ", characters)
//   renderCharacters(characters);
// }

// const filterCharacters = () => {
//   const searchString = document.querySelector("#searchString").value;
//   const re = new RegExp(searchString, "i");
//   matchingCharacters = characters.filter(character => re.test(character.name))
//   renderCharacters(matchingCharacters);
// }

// const renderCharacters = characters => {
//   const divs = characters.map(character => {
//     const el = document.createElement('div');
//     el.addEventListener('click', () => goToCharacterPage(character.id));
//     el.textContent = character.name;
//     return el;
//   })
//   charactersList.replaceChildren(...divs)
// }

// const goToCharacterPage = id => window.location = `/character.html?id=${id}`


// Planet Search
let planets = [];
let matchingPlanets = [];
const planetsList = document.querySelector("#planetsList")

document.addEventListener('DOMContentLoaded', getPlanets)

async function getPlanets() {
  let url = 'http://localhost:9001/api/planets';

  try {
    const fetchedPlanets = await fetch(url)
      .then(res => res.json())
    planets.push(...fetchedPlanets);
  }
  catch (ex) {
    console.error("Error reading planets.", ex.message);
  }
  console.log("All the planets are ", planets)
  renderPlanets(planets);
}

const filterPlanets = () => {
  const searchString = document.querySelector("#searchString").value;
  const re = new RegExp(searchString, "i");
  matchingPlanets = planets.filter(planet => re.test(planet.name))
  renderPlanets(matchingPlanets);
}

const renderPlanets = planets => {
  const divs = planets.map(planet => {
    const el = document.createElement('div');
    el.addEventListener('click', () => goToPlanetPage(planet.id));
    el.textContent = planet.name;
    return el;
  })
  planetsList.replaceChildren(...divs)
}

const goToPlanetPage = id => window.location = `/planet.html?id=${id}`