let jsonComponentBuilder = () => {
    let objToStore = {
    date: $("#journalDate").val(),
    concept: $("#journalConcepts").val(),
    entry: $("#journalEntry").val(),
    moodId: parseInt($("#journalMood").val())
  };
  return objToStore;
}

export default jsonComponentBuilder
