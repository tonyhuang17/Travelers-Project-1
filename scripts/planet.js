let nameH1;
let diameterSpan;
let rotationSpan;
let orbSpan;
let populationSpan;
let climateSpan;
let terrainSpan;
let gravitySpan;
let waterSpan;

let charactersUl;
let filmsUl;
const baseUrl = `http://localhost:9001/api/planets`;

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

  filmsUl = document.querySelector('#films>ul');
  charactersUl = document.querySelector('#characters>ul');

  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
  let planet;
  try {
    planet = await fetchPlanet(id)
    
    planet.films = await fetchFilms(id)
    planet.characters = await fetchCharacters(id)
  }
  catch (ex) {
    console.error(`Error reading planet ${id} data.`, ex.message);
  }
  renderPlanet(planet);

}
async function fetchPlanet(id) {
  let planetUrl = `${baseUrl}/${id}`;
  return await fetch(planetUrl)
    .then(res => res.json())
}

async function fetchFilms(id) {
  const url = `${baseUrl}/${id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

async function fetchCharacters(id) {
  const url = `${baseUrl}/${id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}


const renderPlanet = planet => {
  document.title = `SWAPI - ${planet?.name}`;  // Just to make the browser tab say their name
  nameH1.textContent = planet?.name;

  diameterSpan.textContent = planet?.diameter;
  rotationSpan.textContent = planet?.rotation_period;
  orbSpan.textContent = planet?.orbital_period;
  populationSpan.textContent = planet?.population;

  climateSpan.textContent = planet?.climate.charAt(0).toUpperCase() + planet?.climate.slice(1);
  terrainSpan.textContent = planet?.terrain.charAt(0).toUpperCase() + planet?.terrain.slice(1);
  gravitySpan.textContent = planet?.gravity;

  waterSpan.textContent = (planet?.surface_water === 1 ? 'Yes' : 'No');
  
  const filmsList = planet?.films?.map(film =>`<li><a href="/content/film.html?id=${film.id}">${film.title}</li>`)
  filmsUl.innerHTML = filmsList.join("");
  const charactersList = planet?.characters?.map(character => `<li><a href="/content/character.html?id=${character.id}">${character.name}</li>`)
  charactersUl.innerHTML = charactersList.join("");

}
