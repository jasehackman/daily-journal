// grabbing json file

let API = {
  getJournalEntries () {
      return fetch("http://localhost:8088/journalEntries")
          .then(response => response.json())
  },
  getJournalMoods () {
    return fetch("http://localhost:8088/moods")
          .then(response => response.json())
  },
  getJournalEntriesWMoods () {
    return fetch("http://localhost:8088/journalEntries?_expand=mood")
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
  getJournalEntriesByMood (moodId) {
    return fetch(`http://localhost:8088/journalEntries?moodId=${moodId}&?_expand=mood`)
          .then(response => response.json())
  },
  postAndGet (journalEntryObject) {
    return this.postJournalEntries(journalEntryObject).then(() => this.getJournalEntriesWMoods())
  }
  
}
export default API

// _expand=computer&_expand=department
