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
    <fieldset>
      <label class = "form__fields--floats" for="journalMood">Mood for the day</label>
      <select class = "form__fields--floats" name="journalMood" id="journalMood">
          <option value="sad">Sad</option>
          <option value="happy">Happy</option>
          <option value="ok">Ok</option>
      </select>

      <!-- Submit -->
    </fieldset>
      <input id = "submit" class = "form__fields--floats" type = "button" value="Record Journal Entry">
  </form>
  <section id = "section_radios">
    <h3>Filter Journal By Mood</h3>
    <input type = "radio" class = "radio_mood" name = "mood" value = "sad">Sad
    <input type = "radio" class = "radio_mood" name = "mood" value = "happy">Happy
    <input type = "radio" class = "radio_mood" name = "mood" value = "ok">Ok

  </section>`
  return formHTML;
  },
  formInsertPoint: $("#formInsert")
}

export default formBuilder