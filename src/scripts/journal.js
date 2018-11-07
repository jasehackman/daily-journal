import jsonComponentBuilder from "./buildStorageComponent.js"
import API from "./data.js"
import journalComponent from "./entriesDOM.js"
import formBuilder from "./formBuilder.js"
import formValidation from "./formValidation.js"


/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
    */
API.getJournalMoods().then(moodObjArray => $("#putMoodHere").append(formBuilder.moodDropDownBuilder(moodObjArray)));
API.getJournalMoods().then(moodObjArray => {
  $("#section_radios").append(formBuilder.radioBuilder(moodObjArray))
  let eachRadio = document.querySelectorAll(".radio_mood");
  eachRadio.forEach(radioClick =>
    radioClick.addEventListener('click', () => {
      let clickValue = radioClick.value;
      API.getJournalEntriesByMood(clickValue).then((entriesByMood) => {
        theSpot.text(null);
        theSpot.append(journalComponent.addBuildComponet(entriesByMood))
      })
    }))
})


formValidation.entryFilter();
formValidation.conceptsFilter();

// the spot
const theSpot = $(".section");
// // puts the created component in the DOM
let putApiInDom = () => {
  theSpot.innerHTML = null;
  API.getJournalEntriesWMoods().then((theGoodStuff) => {
    theSpot.append(journalComponent.addBuildComponet(theGoodStuff))
  })
}
putApiInDom();

// submits data and posts in the dom
$("#submit").click(() => {
  theSpot.text(null);
  API.postAndGet(jsonComponentBuilder()).then((journalEntriesfromAPI) => {
    theSpot.append(journalComponent.addBuildComponet(journalEntriesfromAPI))

  })
})

// finds each radio button, puts a click event on them and grabs the value from the clicked item

API.getJournalMoods().then(() => {

})