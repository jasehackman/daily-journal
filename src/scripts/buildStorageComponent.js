let jsonComponentBuilder = () => {
    let objToStore = {
    date: $("#journalDate").val(),
    concept: $("#journalConcepts").val(),
    entry: $("#journalEntry").val(),
    mood: $("#journalMood").val()
  };
  return objToStore;
}

