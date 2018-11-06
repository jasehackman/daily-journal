import formBuilder from "./formBuilder.js"
formBuilder.formInsertPoint.html(formBuilder.formfields())

// fires an alert if the text is longer than 10 characters

const concepts = document.getElementById("journalConcepts");
const entry = document.getElementById("journalEntry");

const formValidation = {

conceptsFilter: () => {$("#journalConcepts").keyup(() => {
  if (concepts.value.length>10) {
    alert("Your text is too long");
    $("#submit").hide();
  } else if(concepts.value.includes("fuck") ||concepts.value.includes("shit")){
    alert("That's not a nice thing to say")
    $("#submit").hide();
  } else {
    $("#submit").show();

  }
})},

entryFilter: () => {$("#journalEntry").keyup(() => {
   if(entry.value.includes("fuck") ||entry.value.includes("shit")){
    alert("That's not a nice thing to say")
    $("#submit").hide();
  } else{
    $("#submit").show();
  }
})
}}

export default formValidation