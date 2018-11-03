let jsonComponentBuilder = () => {
    let objToStore = {
    date: document.getElementById("journalDate").value,
    concept: document.getElementById("journalConcepts").value,
    entry: document.getElementById("journalEntry").value,
    mood: document.getElementById("journalMood").value
  };
  return objToStore;
}

