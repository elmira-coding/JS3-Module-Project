//You can edit ALL of the code here
const allEpisodes = getAllEpisodes();
function getAllEpisodes() {
  const fetchUrl = "https://api.tvmaze.com/shows/82/episodes";
  return fetch(fetchUrl).then((data) => {
    return data.json();
  });
}
function setup() {
  // it is a calling function for accessing all episodes
  //all episode are an array
  makePageForEpisodes(allEpisodes);
}
//filter the filmCard based on the searchTerm
const searchTerm = document.getElementById("q");
searchTerm.addEventListener("input", render);
function render() {
  // console.log(allEpisodes);
  let filteredEpisode = allEpisodes.filter((episode) => {
    return episode.name.includes(searchTerm.value);
  });
  clearCard();
  makePageForEpisodes(filteredEpisode);
  // console.log(searchTerm.value);
  displayEpisodeNum(allEpisodes, filteredEpisode);
}
function displayEpisodeNum(data, filteredEpisode) {
  const episodeNum = document.getElementById("episode-num");
  episodeNum.textContent = filteredEpisode.length + "/" + data.length;
  console.log(episodeNum);
}
//get the value of input
//filter the name episode base on the value input
//render  the filterEpisode on browser

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
//  Remember we need to append the card to the DOM for it to appear.
// document.body.append(card);

// this function is going to make a page to display episode object list
// some info like title summery and etc
function makePageForEpisodes() {
  getAllEpisodes().then((data) => {
    const allEpisodes = data;
    // is the main container for every element
    const rootElem = document.getElementById("root");
    // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
    // find the template for one episode
    const template = document.getElementById("film-card");

    // repeat
    allEpisodes.forEach((episode) => {
      // create card is the completing template
      const card = createFilmCard(template, episode);
      // add to page
      rootElem.appendChild(card);
    });
  });
}

// 1.when all everything in the browser call setup
window.onload = setup;
