//You can edit ALL of the code here
let allEpisodes = [];
function getAllEpisodes() {
  const fetchUrl = "https://api.tvmaze.com/shows/82/episodes";
  return fetch(fetchUrl).then((data) => {
    return data.json();
  });
}
function setup() {
  getAllEpisodes().then((data) => {
    allEpisodes = data;
    makePageForEpisodes(allEpisodes);
    displayEpisodeNum(allEpisodes, allEpisodes);
  });
}

const searchTerm = document.getElementById("q");
searchTerm.addEventListener("input", render);
function render() {
  console.log(searchTerm.value);
  let filteredEpisode = allEpisodes.filter((episode) => {
    return episode.name.includes(searchTerm.value);
  });
  clearCard();
  makePageForEpisodes(filteredEpisode);
  // console.log(searchTerm.value);
  displayEpisodeNum(allEpisodes, filteredEpisode);
}
function displayEpisodeNum(data, filteredEpisode) {
  const episodeNum = document.querySelector("#episode-num");
  episodeNum.textContent =
    "Displaying" + filteredEpisode.length + "/" + data.length + "" + "episodes";
  console.log(episodeNum);
}

function clearCard() {
  document.querySelectorAll(".card").forEach((card) => {
    card.remove();
  });
}
function createFilmCard(template, episode) {
  const card = template.content.cloneNode(true);
  // Now we are querying our cloned fragment, not the entire page.
  const seasonNumber =
    "S" +
    episode.season.toString().padStart(2, "0") +
    "E" +
    episode.number.toString().padStart(2, "0");
  card.querySelector("h3").textContent = episode.name + "-" + seasonNumber;
  card.querySelector("img").src = episode.image.medium;
  card.querySelector("p").innerHTML = episode.summary;

  // Return the card, rather than directly appending it to the page
  return card;
}
function makePageForEpisodes(episodes) {
  const rootElem = document.getElementById("root");
  const template = document.getElementById("film-card");

  episodes.forEach((episode) => {
    const card = createFilmCard(template, episode);
    rootElem.appendChild(card);
  });
}

// 1.when all everything in the browser call setup
window.onload = setup;
