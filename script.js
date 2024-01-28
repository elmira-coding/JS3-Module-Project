//You can edit ALL of the code here
function setup() {
  // it is a calling function for accessing all episodes
  //all episode are an array
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}
// const filmCardNode = document
//   .getElementById("film-card")
//   .content.cloneNode(true);
//we need access to searchTerm
//filter the filmCard based on the searchTerm

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
function makePageForEpisodes(episodeList) {
  // is the main container for every element
  const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  // find the template for one episode
  const template = document.getElementById("film-card");

  // repeat
  episodeList.forEach((episode) => {
    // create card is the completing template
    const card = createFilmCard(template, episode);
    // add to page
    rootElem.appendChild(card);
  });
}

// 1.when all everything in the browser call setup
window.onload = setup;
