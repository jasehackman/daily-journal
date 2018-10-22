

// // puts the created component in the DOM
// let putItInTheSpot = function (theGoodStuff) {
//   theSpot.insertAdjacentHTML('beforeend', journalComponent(theGoodStuff));
// }

let textInsert = ""
const journalComponent = (journalEntries) => {
  journalEntries.forEach( (element) =>{
  textInsert += component(element);
    })
  return textInsert;
} 