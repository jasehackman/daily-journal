(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

let jsonComponentBuilder = () => {
  let objToStore = {
    date: $("#journalDate").val(),
    concept: $("#journalConcepts").val(),
    entry: $("#journalEntry").val(),
    moodId: parseInt($("#journalMood").val())
  };
  return objToStore;
};

var _default = jsonComponentBuilder;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// grabbing json file
let API = {
  getJournalEntries() {
    return fetch("http://localhost:8088/journalEntries").then(response => response.json());
  },

  getJournalMoods() {
    return fetch("http://localhost:8088/moods").then(response => response.json());
  },

  getJournalEntriesWMoods() {
    return fetch("http://localhost:8088/journalEntries?_expand=mood").then(response => response.json());
  },

  postJournalEntries(journalEntryObject) {
    return fetch("http://localhost:8088/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(journalEntryObject)
    });
  },

  getJournalEntriesByMood(moodId) {
    return fetch(`http://localhost:8088/journalEntries?moodId=${moodId}&?_expand=mood`).then(response => response.json());
  },

  postAndGet(journalEntryObject) {
    return this.postJournalEntries(journalEntryObject).then(() => this.getJournalEntriesWMoods());
  }

};
var _default = API; // _expand=computer&_expand=department

exports.default = _default;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _entryComponent = _interopRequireDefault(require("./entryComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// // puts the created component in the DOM
const journalComponent = {
  addBuildComponet(journalEntries) {
    let textInsert = "";
    journalEntries.forEach(element => {
      textInsert += _entryComponent.default.build(element);
    });
    return textInsert;
  }

};
var _default = journalComponent;
exports.default = _default;

},{"./entryComponent":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// creating div
let component = {
  build(element) {
    console.log(element);
    return `<div class = "inserted">
    <h1>${element.date}</h1>
    <h3>${element.concept}</h3>
    <h4>${element.mood.mood}</h4>
    <p>${element.entry}</p>
  </div>`;
  }

};
var _default = component;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
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
  
  </section>`;
    return formHTML;
  },

  formInsertPoint: $("#formInsert"),
  moodDropDownBuilder: moodArray => {
    let dropdown = `<select class = "form__fields--floats" name="journalMood" id="journalMood">`;
    moodArray.forEach(moodobj => {
      dropdown += `<option value=${moodobj.id}>${moodobj.mood}</option>`;
    });
    dropdown += `</select>`;
    return dropdown;
  },
  radioBuilder: moodArray => {
    let radio = `<h3>Filter Journal By Mood</h3>`;
    moodArray.forEach(moodobj => {
      radio += `<input type = "radio" class = "radio_mood" name = "mood" value = ${moodobj.id}>${moodobj.mood}`;
    });
    radio += `</select>`;
    return radio;
  }
};
var _default = formBuilder;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _formBuilder = _interopRequireDefault(require("./formBuilder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_formBuilder.default.formInsertPoint.html(_formBuilder.default.formfields()); // fires an alert if the text is longer than 10 characters


const concepts = document.getElementById("journalConcepts");
const entry = document.getElementById("journalEntry");
const formValidation = {
  conceptsFilter: () => {
    $("#journalConcepts").keyup(() => {
      if (concepts.value.length > 10) {
        alert("Your text is too long");
        $("#submit").hide();
      } else if (concepts.value.includes("fuck") || concepts.value.includes("shit")) {
        alert("That's not a nice thing to say");
        $("#submit").hide();
      } else {
        $("#submit").show();
      }
    });
  },
  entryFilter: () => {
    $("#journalEntry").keyup(() => {
      if (entry.value.includes("fuck") || entry.value.includes("shit")) {
        alert("That's not a nice thing to say");
        $("#submit").hide();
      } else {
        $("#submit").show();
      }
    });
  }
};
var _default = formValidation;
exports.default = _default;

},{"./formBuilder.js":5}],7:[function(require,module,exports){
"use strict";

var _buildStorageComponent = _interopRequireDefault(require("./buildStorageComponent.js"));

var _data = _interopRequireDefault(require("./data.js"));

var _entriesDOM = _interopRequireDefault(require("./entriesDOM.js"));

var _formBuilder = _interopRequireDefault(require("./formBuilder.js"));

var _formValidation = _interopRequireDefault(require("./formValidation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
    */
_data.default.getJournalMoods().then(moodObjArray => $("#putMoodHere").append(_formBuilder.default.moodDropDownBuilder(moodObjArray)));

_data.default.getJournalMoods().then(moodObjArray => {
  $("#section_radios").append(_formBuilder.default.radioBuilder(moodObjArray));
  let eachRadio = document.querySelectorAll(".radio_mood");
  eachRadio.forEach(radioClick => radioClick.addEventListener('click', () => {
    let clickValue = radioClick.value;

    _data.default.getJournalEntriesByMood(clickValue).then(entriesByMood => {
      console.log(entriesByMood);
      theSpot.text(null);
      theSpot.append(_entriesDOM.default.addBuildComponet(entriesByMood));
    });
  }));
});

_formValidation.default.entryFilter();

_formValidation.default.conceptsFilter(); // the spot


const theSpot = $(".section"); // // puts the created component in the DOM

let putApiInDom = () => {
  theSpot.innerHTML = null;

  _data.default.getJournalEntriesWMoods().then(theGoodStuff => {
    theSpot.append(_entriesDOM.default.addBuildComponet(theGoodStuff));
  });
};

putApiInDom(); // submits data and posts in the dom

$("#submit").click(() => {
  theSpot.text(null);

  _data.default.postAndGet((0, _buildStorageComponent.default)()).then(journalEntriesfromAPI => {
    theSpot.append(_entriesDOM.default.addBuildComponet(journalEntriesfromAPI));
  });
}); // finds each radio button, puts a click event on them and grabs the value from the clicked item

_data.default.getJournalMoods().then(() => {});

},{"./buildStorageComponent.js":1,"./data.js":2,"./entriesDOM.js":3,"./formBuilder.js":5,"./formValidation.js":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkU3RvcmFnZUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2Zvcm1CdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxJQUFJLG9CQUFvQixHQUFHLE1BQU07QUFDN0IsTUFBSSxVQUFVLEdBQUc7QUFDakIsSUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURXO0FBRWpCLElBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRlE7QUFHakIsSUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUhVO0FBSWpCLElBQUEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBQUQ7QUFKQyxHQUFqQjtBQU1GLFNBQU8sVUFBUDtBQUNELENBUkQ7O2VBVWUsb0I7Ozs7Ozs7Ozs7QUNWZjtBQUVBLElBQUksR0FBRyxHQUFHO0FBQ1IsRUFBQSxpQkFBaUIsR0FBSTtBQUNqQixXQUFPLEtBQUssQ0FBQyxzQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUpPOztBQUtSLEVBQUEsZUFBZSxHQUFJO0FBQ2pCLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDQSxJQURBLENBQ0ssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGpCLENBQVA7QUFFRCxHQVJPOztB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QU8sQ0FBQyxTQUFSLEdBQW9CLElBQXBCOztBQUNBLGdCQUFJLHVCQUFKLEdBQThCLElBQTlCLENBQW9DLFlBQUQsSUFBa0I7QUFDbkQsSUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFpQixnQkFBakIsQ0FBa0MsWUFBbEMsQ0FBZjtBQUNELEdBRkQ7QUFHRCxDQUxEOztBQU1BLFdBQVcsRyxDQUVYOztBQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLENBQW1CLE1BQU07QUFDdkIsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWI7O0FBQ0EsZ0JBQUksVUFBSixDQUFlLHFDQUFmLEVBQXVDLElBQXZDLENBQTZDLHFCQUFELElBQTJCO0FBQ3JFLElBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxvQkFBaUIsZ0JBQWpCLENBQWtDLHFCQUFsQyxDQUFmO0FBRUQsR0FIRDtBQUlELENBTkQsRSxDQVFBOztBQUVBLGNBQUksZUFBSixHQUFzQixJQUF0QixDQUEyQixNQUFNLENBRWhDLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQganNvbkNvbXBvbmVudEJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgb2JqVG9TdG9yZSA9IHtcclxuICAgIGRhdGU6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXHJcbiAgICBjb25jZXB0OiAkKFwiI2pvdXJuYWxDb25jZXB0c1wiKS52YWwoKSxcclxuICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcclxuICAgIG1vb2RJZDogcGFyc2VJbnQoJChcIiNqb3VybmFsTW9vZFwiKS52YWwoKSlcclxuICB9O1xyXG4gIHJldHVybiBvYmpUb1N0b3JlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqc29uQ29tcG9uZW50QnVpbGRlclxyXG4iLCIvLyBncmFiYmluZyBqc29uIGZpbGVcclxuXHJcbmxldCBBUEkgPSB7XHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMgKCkge1xyXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIGdldEpvdXJuYWxNb29kcyAoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHNcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIGdldEpvdXJuYWxFbnRyaWVzV01vb2RzICgpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9fZXhwYW5kPW1vb2RcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIHBvc3RKb3VybmFsRW50cmllcyhqb3VybmFsRW50cnlPYmplY3QpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gIH0sXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5T2JqZWN0KVxyXG4gIH0pfSxcclxuICBnZXRKb3VybmFsRW50cmllc0J5TW9vZCAobW9vZElkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9tb29kSWQ9JHttb29kSWR9Jj9fZXhwYW5kPW1vb2RgKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgcG9zdEFuZEdldCAoam91cm5hbEVudHJ5T2JqZWN0KSB7XHJcbiAgICByZXR1cm4gdGhpcy5wb3N0Sm91cm5hbEVudHJpZXMoam91cm5hbEVudHJ5T2JqZWN0KS50aGVuKCgpID0+IHRoaXMuZ2V0Sm91cm5hbEVudHJpZXNXTW9vZHMoKSlcclxuICB9XHJcbiAgXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQVBJXHJcblxyXG4vLyBfZXhwYW5kPWNvbXB1dGVyJl9leHBhbmQ9ZGVwYXJ0bWVudFxyXG4iLCJpbXBvcnQgY29tcG9uZW50IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcclxuXHJcblxyXG4vLyAvLyBwdXRzIHRoZSBjcmVhdGVkIGNvbXBvbmVudCBpbiB0aGUgRE9NXHJcblxyXG5cclxuY29uc3Qgam91cm5hbENvbXBvbmVudCA9IHtcclxuICBhZGRCdWlsZENvbXBvbmV0IChqb3VybmFsRW50cmllcykgIHtcclxuICAgIGxldCB0ZXh0SW5zZXJ0ID0gXCJcIlxyXG4gICAgam91cm5hbEVudHJpZXMuZm9yRWFjaCggKGVsZW1lbnQpID0+e1xyXG4gICAgdGV4dEluc2VydCArPSBjb21wb25lbnQuYnVpbGQoZWxlbWVudCk7XHJcbiAgICAgIH0pXHJcbiAgICByZXR1cm4gdGV4dEluc2VydDtcclxuICB9IFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsQ29tcG9uZW50IiwiLy8gY3JlYXRpbmcgZGl2XHJcblxyXG4gbGV0IGNvbXBvbmVudCA9IHtcclxuICBidWlsZCAoZWxlbWVudCkge1xyXG4gICAgY29uc29sZS5sb2coZWxlbWVudCk7XHJcbiAgcmV0dXJuIGA8ZGl2IGNsYXNzID0gXCJpbnNlcnRlZFwiPlxyXG4gICAgPGgxPiR7ZWxlbWVudC5kYXRlfTwvaDE+XHJcbiAgICA8aDM+JHtlbGVtZW50LmNvbmNlcHR9PC9oMz5cclxuICAgIDxoND4ke2VsZW1lbnQubW9vZC5tb29kfTwvaDQ+XHJcbiAgICA8cD4ke2VsZW1lbnQuZW50cnl9PC9wPlxyXG4gIDwvZGl2PmA7XHJcbn1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50IiwiXHJcblxyXG4vLyBUT0RPOiByZWZhY3RvciBzbyBJIGFtIGFjdHVhbGx5IHVzaW5nIGZ1bmN0aW9ucyB0byBidWlsZCBhbGwgb2YgdGhlIGNvbXBvbmVudHMgXHJcbmxldCBmb3JtQnVpbGRlciA9IHtcclxuICBmb3JtZmllbGRzKCkge1xyXG4gICAgbGV0IGZvcm1IVE1MID0gYCAgXHJcbiAgICA8Zm9ybSBhY3Rpb24gPSAnJz5cclxuICAgIFxyXG4gICAgPCEtLSBEYXRlIC0tPlxyXG4gICAgPGZpZWxkc2V0PlxyXG4gICAgICA8bGFiZWwgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgZm9yPVwiam91cm5hbERhdGVcIj5EYXRlIG9mIGVudHJ5PC9sYWJlbD5cclxuICAgICAgPGlucHV0ICB0eXBlID0gXCJkYXRlXCIgbmFtZT0gJ2pvdXJuYWxEYXRlJyBpZD1cImpvdXJuYWxEYXRlXCI+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICBcclxuICAgIDwhLS0gQ29uY2VwdHMgLS0+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxsYWJlbCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBmb3I9XCJqb3VybmFsQ29uY2VwdHNcIj5Db25jZXB0cyBDb3ZlcmVkPC9sYWJlbD5cclxuICAgICAgPGlucHV0IGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIHR5cGUgPSBcInRleHRcIiBuYW1lPSAnam91cm5hbENvbmNlcHRzJyBpZD1cImpvdXJuYWxDb25jZXB0c1wiIG1heGxlbmd0aD1cIjExXCI+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICAgXHJcbiAgICA8IS0tIEVudHJ5IC0tPlxyXG4gICAgPGZpZWxkc2V0PlxyXG4gICAgICA8bGFiZWwgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgZm9yPVwiam91cm5hbEVudHJ5XCI+Sm91cm5hbCBFbnRyeTwvbGFiZWw+XHJcbiAgICAgIDx0ZXh0YXJlYSBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBuYW1lID1cImpvdXJuYWxFbnRyeVwiIGlkID0gXCJqb3VybmFsRW50cnlcIiByb3dzID0gJzUnIGNvbHM9JzMwJz5UeXBlIHlvdXIgZW50cnkgaGVyZSE8L3RleHRhcmVhPlxyXG4gICAgPC9maWVsZHNldD5cclxuXHJcbiAgICA8IS0tIE1vb2QgLS0+XHJcbiAgICA8ZmllbGRzZXQgaWQgPSBcInB1dE1vb2RIZXJlXCI+XHJcbiAgICAgXHJcbiAgICAgIDwhLS0gU3VibWl0IC0tPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgICAgPGlucHV0IGlkID0gXCJzdWJtaXRcIiBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiB0eXBlID0gXCJidXR0b25cIiB2YWx1ZT1cIlJlY29yZCBKb3VybmFsIEVudHJ5XCI+XHJcbiAgPC9mb3JtPlxyXG4gIDxzZWN0aW9uIGlkID0gXCJzZWN0aW9uX3JhZGlvc1wiPlxyXG4gIFxyXG4gIDwvc2VjdGlvbj5gXHJcbiAgcmV0dXJuIGZvcm1IVE1MO1xyXG4gIH0sXHJcbiAgZm9ybUluc2VydFBvaW50OiAkKFwiI2Zvcm1JbnNlcnRcIiksXHJcbiAgXHJcbiAgbW9vZERyb3BEb3duQnVpbGRlcjogKG1vb2RBcnJheSkgPT4ge1xyXG4gICAgbGV0IGRyb3Bkb3duID0gYDxzZWxlY3QgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgbmFtZT1cImpvdXJuYWxNb29kXCIgaWQ9XCJqb3VybmFsTW9vZFwiPmA7XHJcbiAgICBtb29kQXJyYXkuZm9yRWFjaChtb29kb2JqID0+e1xyXG4gICAgICBkcm9wZG93bis9YDxvcHRpb24gdmFsdWU9JHttb29kb2JqLmlkfT4ke21vb2RvYmoubW9vZH08L29wdGlvbj5gXHJcbiAgICB9KTtcclxuICAgIGRyb3Bkb3duKz1gPC9zZWxlY3Q+YDtcclxuICAgIHJldHVybiBkcm9wZG93bjtcclxuICB9LFxyXG4gIHJhZGlvQnVpbGRlcjogKG1vb2RBcnJheSkgPT4ge1xyXG4gICAgbGV0IHJhZGlvID0gYDxoMz5GaWx0ZXIgSm91cm5hbCBCeSBNb29kPC9oMz5gO1xyXG4gICAgbW9vZEFycmF5LmZvckVhY2gobW9vZG9iaiA9PntcclxuICAgICAgcmFkaW8rPWA8aW5wdXQgdHlwZSA9IFwicmFkaW9cIiBjbGFzcyA9IFwicmFkaW9fbW9vZFwiIG5hbWUgPSBcIm1vb2RcIiB2YWx1ZSA9ICR7bW9vZG9iai5pZH0+JHttb29kb2JqLm1vb2R9YFxyXG4gICAgfSk7XHJcbiAgICByYWRpbys9YDwvc2VsZWN0PmA7XHJcbiAgICByZXR1cm4gcmFkaW87XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtQnVpbGRlciIsImltcG9ydCBmb3JtQnVpbGRlciBmcm9tIFwiLi9mb3JtQnVpbGRlci5qc1wiXHJcbmZvcm1CdWlsZGVyLmZvcm1JbnNlcnRQb2ludC5odG1sKGZvcm1CdWlsZGVyLmZvcm1maWVsZHMoKSlcclxuXHJcbi8vIGZpcmVzIGFuIGFsZXJ0IGlmIHRoZSB0ZXh0IGlzIGxvbmdlciB0aGFuIDEwIGNoYXJhY3RlcnNcclxuXHJcbmNvbnN0IGNvbmNlcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsQ29uY2VwdHNcIik7XHJcbmNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb3VybmFsRW50cnlcIik7XHJcblxyXG5jb25zdCBmb3JtVmFsaWRhdGlvbiA9IHtcclxuXHJcbmNvbmNlcHRzRmlsdGVyOiAoKSA9PiB7JChcIiNqb3VybmFsQ29uY2VwdHNcIikua2V5dXAoKCkgPT4ge1xyXG4gIGlmIChjb25jZXB0cy52YWx1ZS5sZW5ndGg+MTApIHtcclxuICAgIGFsZXJ0KFwiWW91ciB0ZXh0IGlzIHRvbyBsb25nXCIpO1xyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSBpZihjb25jZXB0cy52YWx1ZS5pbmNsdWRlcyhcImZ1Y2tcIikgfHxjb25jZXB0cy52YWx1ZS5pbmNsdWRlcyhcInNoaXRcIikpe1xyXG4gICAgYWxlcnQoXCJUaGF0J3Mgbm90IGEgbmljZSB0aGluZyB0byBzYXlcIilcclxuICAgICQoXCIjc3VibWl0XCIpLmhpZGUoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJChcIiNzdWJtaXRcIikuc2hvdygpO1xyXG5cclxuICB9XHJcbn0pfSxcclxuXHJcbmVudHJ5RmlsdGVyOiAoKSA9PiB7JChcIiNqb3VybmFsRW50cnlcIikua2V5dXAoKCkgPT4ge1xyXG4gICBpZihlbnRyeS52YWx1ZS5pbmNsdWRlcyhcImZ1Y2tcIikgfHxlbnRyeS52YWx1ZS5pbmNsdWRlcyhcInNoaXRcIikpe1xyXG4gICAgYWxlcnQoXCJUaGF0J3Mgbm90IGEgbmljZSB0aGluZyB0byBzYXlcIilcclxuICAgICQoXCIjc3VibWl0XCIpLmhpZGUoKTtcclxuICB9IGVsc2V7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5zaG93KCk7XHJcbiAgfVxyXG59KVxyXG59fVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZm9ybVZhbGlkYXRpb24iLCJpbXBvcnQganNvbkNvbXBvbmVudEJ1aWxkZXIgZnJvbSBcIi4vYnVpbGRTdG9yYWdlQ29tcG9uZW50LmpzXCJcclxuaW1wb3J0IEFQSSBmcm9tIFwiLi9kYXRhLmpzXCJcclxuaW1wb3J0IGpvdXJuYWxDb21wb25lbnQgZnJvbSBcIi4vZW50cmllc0RPTS5qc1wiXHJcbmltcG9ydCBmb3JtQnVpbGRlciBmcm9tIFwiLi9mb3JtQnVpbGRlci5qc1wiXHJcbmltcG9ydCBmb3JtVmFsaWRhdGlvbiBmcm9tIFwiLi9mb3JtVmFsaWRhdGlvbi5qc1wiXHJcblxyXG5cclxuLypcclxuICAgIE1haW4gYXBwbGljYXRpb24gbG9naWMgdGhhdCB1c2VzIHRoZSBmdW5jdGlvbnMgYW5kIG9iamVjdHNcclxuICAgIGRlZmluZWQgaW4gdGhlIG90aGVyIEphdmFTY3JpcHQgZmlsZXMuXHJcblxyXG4gICAgQ2hhbmdlIHRoZSBmYWtlIHZhcmlhYmxlIG5hbWVzIGJlbG93IHRvIHdoYXQgdGhleSBzaG91bGQgYmVcclxuICAgIHRvIGdldCB0aGUgZGF0YSBhbmQgZGlzcGxheSBpdC5cclxuICAgICovXHJcbkFQSS5nZXRKb3VybmFsTW9vZHMoKS50aGVuKG1vb2RPYmpBcnJheSA9PiAkKFwiI3B1dE1vb2RIZXJlXCIpLmFwcGVuZChmb3JtQnVpbGRlci5tb29kRHJvcERvd25CdWlsZGVyKG1vb2RPYmpBcnJheSkpKTtcclxuQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4obW9vZE9iakFycmF5ID0+IHtcclxuICAkKFwiI3NlY3Rpb25fcmFkaW9zXCIpLmFwcGVuZChmb3JtQnVpbGRlci5yYWRpb0J1aWxkZXIobW9vZE9iakFycmF5KSlcclxuICBsZXQgZWFjaFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYWRpb19tb29kXCIpO1xyXG4gIGVhY2hSYWRpby5mb3JFYWNoKHJhZGlvQ2xpY2sgPT5cclxuICAgIHJhZGlvQ2xpY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgIGxldCBjbGlja1ZhbHVlID0gcmFkaW9DbGljay52YWx1ZTtcclxuICAgICAgQVBJLmdldEpvdXJuYWxFbnRyaWVzQnlNb29kKGNsaWNrVmFsdWUpLnRoZW4oKGVudHJpZXNCeU1vb2QpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlbnRyaWVzQnlNb29kKTtcclxuICAgICAgICB0aGVTcG90LnRleHQobnVsbCk7XHJcbiAgICAgICAgdGhlU3BvdC5hcHBlbmQoam91cm5hbENvbXBvbmVudC5hZGRCdWlsZENvbXBvbmV0KGVudHJpZXNCeU1vb2QpKVxyXG4gICAgICB9KVxyXG4gICAgfSkpXHJcbn0pXHJcblxyXG5cclxuZm9ybVZhbGlkYXRpb24uZW50cnlGaWx0ZXIoKTtcclxuZm9ybVZhbGlkYXRpb24uY29uY2VwdHNGaWx0ZXIoKTtcclxuXHJcbi8vIHRoZSBzcG90XHJcbmNvbnN0IHRoZVNwb3QgPSAkKFwiLnNlY3Rpb25cIik7XHJcbi8vIC8vIHB1dHMgdGhlIGNyZWF0ZWQgY29tcG9uZW50IGluIHRoZSBET01cclxubGV0IHB1dEFwaUluRG9tID0gKCkgPT4ge1xyXG4gIHRoZVNwb3QuaW5uZXJIVE1MID0gbnVsbDtcclxuICBBUEkuZ2V0Sm91cm5hbEVudHJpZXNXTW9vZHMoKS50aGVuKCh0aGVHb29kU3R1ZmYpID0+IHtcclxuICAgIHRoZVNwb3QuYXBwZW5kKGpvdXJuYWxDb21wb25lbnQuYWRkQnVpbGRDb21wb25ldCh0aGVHb29kU3R1ZmYpKVxyXG4gIH0pXHJcbn1cclxucHV0QXBpSW5Eb20oKTtcclxuXHJcbi8vIHN1Ym1pdHMgZGF0YSBhbmQgcG9zdHMgaW4gdGhlIGRvbVxyXG4kKFwiI3N1Ym1pdFwiKS5jbGljaygoKSA9PiB7XHJcbiAgdGhlU3BvdC50ZXh0KG51bGwpO1xyXG4gIEFQSS5wb3N0QW5kR2V0KGpzb25Db21wb25lbnRCdWlsZGVyKCkpLnRoZW4oKGpvdXJuYWxFbnRyaWVzZnJvbUFQSSkgPT4ge1xyXG4gICAgdGhlU3BvdC5hcHBlbmQoam91cm5hbENvbXBvbmVudC5hZGRCdWlsZENvbXBvbmV0KGpvdXJuYWxFbnRyaWVzZnJvbUFQSSkpXHJcblxyXG4gIH0pXHJcbn0pXHJcblxyXG4vLyBmaW5kcyBlYWNoIHJhZGlvIGJ1dHRvbiwgcHV0cyBhIGNsaWNrIGV2ZW50IG9uIHRoZW0gYW5kIGdyYWJzIHRoZSB2YWx1ZSBmcm9tIHRoZSBjbGlja2VkIGl0ZW1cclxuXHJcbkFQSS5nZXRKb3VybmFsTW9vZHMoKS50aGVuKCgpID0+IHtcclxuXHJcbn0pIl19
