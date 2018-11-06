// grabbing json file

let API = {
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
  })},
  getJournalEntriesByMood (mood) {
    return fetch(`http://localhost:8088/journalEntries?mood=${mood}`)
          .then(response => response.json())
  },
  postAndGet (journalEntryObject) {
    return this.postJournalEntries(journalEntryObject).then(() => this.getJournalEntries())
  }
  
}

export default API