// grabbing json file

const API = {
  getJournalEntries () {
      return fetch("http://localhost:8088/journalEntries")
          .then(response => response.json())
  },
  postJournalEntries(journalEntryObject) {
    return fetch("http://localhost:8088/journalEntries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
  },
  body: JSON.stringify(journalEntryObject)
  })}}

