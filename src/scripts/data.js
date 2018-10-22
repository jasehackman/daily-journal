// grabbing json file
// fetch("http://localhost:8088/journalEntries").then(stuff => stuff.json())
//   .then(theGoodStuff => {
//     putItInTheSpot(theGoodStuff);
//   })


const API = {
  getJournalEntries () {
      return fetch("http://localhost:8088/journalEntries")
          .then(response => response.json())
  }
}