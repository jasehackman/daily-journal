// grabbing json file
fetch("http://localhost:8088/journalEntries").then(stuff => stuff.json())
  .then(theGoodStuff => {
    putItInTheSpot(theGoodStuff);
  })