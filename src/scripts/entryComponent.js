// creating div


let component = (element) => {
return `<div class = "inserted">
  <h1>${element.date}</h1>
  <h3>${element.concept}</h3>
  <h4>${element.mood}</h4>
  <p>${element.entry}</p>
</div>`;
}





// let textInsert = ""
// const journalComponent = (journalEntries) => {
//   journalEntries.forEach( (element) =>{
//   textInsert += `<div class = "inserted">
//                   <h1>${element.date}</h1>
//                   <h3>${element.concept}</h3>
//                   <h4>${element.mood}</h4>
//                   <p>${element.entry}</p>
//                 </div>`;
//   })
//   return textInsert;
// } 