// fires an alert if the text is longer than 10 characters

$("#journalConcepts").keyup(() => {
  if (concepts.value.length>10) {
    alert("Your text is too long");
  } else if(concepts.value.includes("fuck") ||concepts.value.includes("shit")){
    alert("That's not a nice thing to say")
  }
})

$("#journalEntry").keyup(() => {
   if(entry.value.includes("fuck") ||entry.value.includes("shit")){
    alert("That's not a nice thing to say")
  }
})