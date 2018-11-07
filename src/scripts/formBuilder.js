

// TODO: refactor so I am actually using functions to build all of the components 
let formBuilder = {
  formfields() {
    let formHTML = `  
    <form action = ''>
    
    <!-- Date -->
    <fieldset>
      <label class = "form__fields--floats" for="journalDate">Date of entry</label>
      <input  type = "date" name= 'journalDate' id="journalDate">
    </fieldset>
   
    <!-- Concepts -->
    <fieldset>
      <label class = "form__fields--floats" for="journalConcepts">Concepts Covered</label>
      <input class = "form__fields--floats" type = "text" name= 'journalConcepts' id="journalConcepts" maxlength="11">
    </fieldset>
    
    <!-- Entry -->
    <fieldset>
      <label class = "form__fields--floats" for="journalEntry">Journal Entry</label>
      <textarea class = "form__fields--floats" name ="journalEntry" id = "journalEntry" rows = '5' cols='30'>Type your entry here!</textarea>
    </fieldset>

    <!-- Mood -->
    <fieldset id = "putMoodHere">
     
      <!-- Submit -->
    </fieldset>
      <input id = "submit" class = "form__fields--floats" type = "button" value="Record Journal Entry">
  </form>
  <section id = "section_radios">
  
  </section>`
  return formHTML;
  },
  formInsertPoint: $("#formInsert"),
  
  moodDropDownBuilder: (moodArray) => {
    let dropdown = `<select class = "form__fields--floats" name="journalMood" id="journalMood">`;
    moodArray.forEach(moodobj =>{
      dropdown+=`<option value=${moodobj.id}>${moodobj.mood}</option>`
    });
    dropdown+=`</select>`;
    return dropdown;
  },
  radioBuilder: (moodArray) => {
    let radio = `<h3>Filter Journal By Mood</h3>`;
    moodArray.forEach(moodobj =>{
      radio+=`<input type = "radio" class = "radio_mood" name = "mood" value = ${moodobj.id}>${moodobj.mood}`
    });
    radio+=`</select>`;
    return radio;
  }
}

export default formBuilder