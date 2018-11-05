/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
*/


// the spot
const theSpot = $(".section");
// // puts the created component in the DOM
let putApiInDom = () => {
  theSpot.innerHTML = null; 
  API.getJournalEntries().then((theGoodStuff) => {
  theSpot.append(journalComponent.addBuildComponet(theGoodStuff))
})}
putApiInDom();

// submits data and posts in the dom
$("#submit").click(() => { 
  theSpot.text(null);
  API.postAndGet(jsonComponentBuilder()).then((journalEntriesfromAPI) => {
    theSpot.append(journalComponent.addBuildComponet(journalEntriesfromAPI))

  })
})

// finds each radio button, puts a click event on them and grabs the value from the clicked item
let eachRadio = document.querySelectorAll(".radio_mood");
eachRadio.forEach( radioClick =>
  radioClick.addEventListener('click', () => {
    let clickValue = radioClick.value;
    API.getJournalEntriesByMood(clickValue).then((entriesByMood) => {
      theSpot.text(null); 
      theSpot.append(journalComponent.addBuildComponet(entriesByMood))
    })
    } ))

