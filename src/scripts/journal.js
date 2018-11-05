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

// submits data and posts in the dom
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => { 
  theSpot.innerHTML = null;
  API.postAndGet(jsonComponentBuilder()).then((journalEntriesfromAPI) => {
    theSpot.insertAdjacentHTML('beforeend', journalComponent.addBuildComponet(journalEntriesfromAPI))

  })
})

// finds each radio button, puts a click event on them and grabs the value from the clicked item
let eachRadio = document.querySelectorAll(".radio_mood");
eachRadio.forEach( radioClick =>
  radioClick.addEventListener('click', () => {
    let clickValue = radioClick.value;
    API.getJournalEntriesByMood(clickValue).then((entriesByMood) => {
      theSpot.innerHTML = null; 
      theSpot.insertAdjacentHTML('beforeend', journalComponent.addBuildComponet(entriesByMood))
    })
    } ))

