const journalEntries = [
  {
      date: "07/24/2018",
      concept: "Array methods",
      entry: "We learned about 4 different array methods today. forEach made sense, but the others still confuse me.",
      mood: "Ok"
  }
]


// creating div
let textInsert = ""
const journalComponent = (journalEntries) => {
  journalEntries.forEach( (element) =>{
  textInsert += `<div class = "inserted">
                  <h1>${element.date}</h1>
                  <h3>${element.concept}</h3>
                  <h4>${element.mood}</h4>
                  <p>${element.entry}</p>
                </div>`;
  })
  return textInsert;
} 

// the spot
const theSpot = document.querySelector(".section");
theSpot.insertAdjacentHTML('beforeend', journalComponent(journalEntries));  