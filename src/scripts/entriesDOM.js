

// // puts the created component in the DOM


const journalComponent = {
  addBuildComponet (journalEntries)  {
    let textInsert = ""
    journalEntries.forEach( (element) =>{
    textInsert += component.build(element);
      })
    return textInsert;
  } 
}