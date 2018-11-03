/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/


// the spot
const theSpot = document.querySelector(".section");
// // puts the created component in the DOM
let putApiInDom = () => {
  theSpot.innerHTML = null; 
  API.getJournalEntries().then((theGoodStuff) => {
  theSpot.insertAdjacentHTML('beforeend', journalComponent.addBuildComponet(theGoodStuff))
})}
putApiInDom();

let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => { 
  API.postJournalEntries(jsonComponentBuilder()).then(() => {
    putApiInDom();
  })
})