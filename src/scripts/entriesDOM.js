// the spot
const theSpot = document.querySelector(".section");

// puts the created component in the DOM
let putItInTheSpot = function (theGoodStuff) {
  theSpot.insertAdjacentHTML('beforeend', journalComponent(theGoodStuff));
}