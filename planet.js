let nameH1;
let diameterSpan;
let rotationSpan;
let orbSpan;
let populationSpan;
let climateSpan;
let terrainSpan;
let gravitySpan;
let waterSpan;
const baseUrl = `http://localhost:9001/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');

  diameterSpan = document.querySelector('span#diameter');
  rotationSpan = document.querySelector('span#rot_period');
  orbSpan = document.querySelector('span#orb_period');
  populationSpan = document.querySelector('span#population');
 
  climateSpan = document.querySelector('span#climate');
  terrainSpan = document.querySelector('span#terrain');
  gravitySpan = document.querySelector('span#gravity');
  waterSpan = document.querySelector('span#has_water');
  
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    console.log(planet);
    // Template for linkable elements
    // character.homeworld = await fetchHomeworld(character)
    
    // character.homeworld = await fetchHomeworld(character)
    // character.films = await fetchFilms(character)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet[0]);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/planets?id=${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())

}

// Template async function for fetching info about
// async function fetchHomeworld(character) {
//   const url = `${baseUrl}/planets/${character?.homeworld}`;
//   const planet = await fetch(url)
//     .then(res => res.json())
//   return planet;
// }

const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;

  diameterSpan.textContent = planet?.diameter;
  rotationSpan.textContent = planet?.rotation_period;
  orbSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;

  climateSpan.textContent = planet?.climate;
  terrainSpan.textContent = planet?.terrain;
  gravitySpan.textContent = planet?.gravity;

  waterSpan.textContent = (planet?.surface_water === 1 ? 'Yes' : 'No');
  
  // const filmsLis = character?.films?.map(film => `<li><a href="/film.html?id=${film.id}">${film.title}</li>`)
  // filmsUl.innerHTML = filmsLis.join("");
}
