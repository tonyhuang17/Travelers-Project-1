let titleH1;
let producerSpan;
let episodeNumberSpan;
let directorSpan;
let releaseDateSpan;
let openingSpan;
let charactersDiv;
let planetsDiv;
const baseUrl = `http://localhost:9001/api/films`;

addEventListener('DOMContentLoaded', () => {
    titleH1 = document.querySelector('h1#title');
    producerSpan = document.querySelector('span#producer');
    episodeNumberSpan = document.querySelector('span#episode_id');
    directorSpan = document.querySelector('span#director');
    releaseDateSpan = document.querySelector('span#release_date');
    openingSpan = document.querySelector('span#opening_crawl');
    charactersUl = document.querySelector('#characters>ul');
    planetsUl = document.querySelector('#planets>ul');
    const sp = new URLSearchParams(window.location.search)
    const id = sp.get('id')
    getFilm(id)
});

//Gets film and relevant information and displays it using html
async function getFilm(id){
    let film;
    try {
        film = await fetchFilm(id)
        film.characters = await fetchCharacters(id)
        film.planets = await fetchPlanets(id)
    }
    catch(err){
        console.error(`Cannot find the film ${id}`);
    }
    renderFilm(film);
}

//fetching the film
async function fetchFilm(id){
    const url = `${baseUrl}/${id}`;
    return await fetch(url)
        .then(res => res.json())
}

//fetching characters in the film
async function fetchCharacters(id){
    const url = `${baseUrl}/${id}/characters`;
    const characters = await fetch(url)
        .then(res => res.json())
    return characters;
}

//Fetching planets for the film
async function fetchPlanets(id){
    const url = `${baseUrl}/${id}/planets`;
    const planets = await fetch(url)
        .then(res => res.json())
    return planets;
}

const renderFilm = film => {
    document.title = `SWAPI - ${film?.title}`;
    titleH1.textContent = film?.title;
    producerSpan.textContent = film?.producer;
    episodeNumberSpan.textContent = film?.episode_id;
    directorSpan.textContent = film?.director;
    releaseDateSpan.textContent = film?.release_date;
    openingSpan.textContent = film?.opening_crawl;
    const charactersList = film?.characters?.map(character =>`<li><a href="/content/character.html?id=${character.id}">${character.name}</li>`)
    charactersUl.innerHTML = charactersList.join("");
    const planetsList = film?.planets?.map(planet =>`<li><a href="/content/planet.html?id=${planet.id}">${planet.name}</li>`)
    planetsUl.innerHTML = planetsList.join("");
}