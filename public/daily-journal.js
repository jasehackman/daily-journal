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

  getJournalEntriesByMood(moodid) {
    return fetch(`http://localhost:8088/journalEntries?_expand=mood&moodId=${moodid}`).then(response => response.json());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkU3RvcmFnZUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2Zvcm1CdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxJQUFJLG9CQUFvQixHQUFHLE1BQU07QUFDN0IsTUFBSSxVQUFVLEdBQUc7QUFDakIsSUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURXO0FBRWpCLElBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRlE7QUFHakIsSUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUhVO0FBSWpCLElBQUEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBQUQ7QUFKQyxHQUFqQjtBQU1GLFNBQU8sVUFBUDtBQUNELENBUkQ7O2VBVWUsb0I7Ozs7Ozs7Ozs7QUNWZjtBQUVBLElBQUksR0FBRyxHQUFHO0FBQ1IsRUFBQSxpQkFBaUIsR0FBSTtBQUNqQixXQUFPLEtBQUssQ0FBQyxzQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUpPOztBQUtSLEVBQUEsZUFBZSxHQUFJO0FBQ2pCLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDQSxJQURBLENBQ0ssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGpCLENBQVA7QUFFRCxHQVJPOztB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LHVCQUFKLEdBQThCLElBQTlCLENBQW9DLFlBQUQsSUFBa0I7QUFDbkQsSUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFpQixnQkFBakIsQ0FBa0MsWUFBbEMsQ0FBZjtBQUNELEdBRkQ7QUFHRCxDQUxEOztBQU1BLFdBQVcsRyxDQUVYOztBQUNBLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUFiLENBQW1CLE1BQU07QUFDdkIsRUFBQSxPQUFPLENBQUMsSUFBUixDQUFhLElBQWI7O0FBQ0EsZ0JBQUksVUFBSixDQUFlLHFDQUFmLEVBQXVDLElBQXZDLENBQTZDLHFCQUFELElBQTJCO0FBQ3JFLElBQUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxvQkFBaUIsZ0JBQWpCLENBQWtDLHFCQUFsQyxDQUFmO0FBRUQsR0FIRDtBQUlELENBTkQsRSxDQVFBOztBQUVBLGNBQUksZUFBSixHQUFzQixJQUF0QixDQUEyQixNQUFNLENBRWhDLENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQganNvbkNvbXBvbmVudEJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgb2JqVG9TdG9yZSA9IHtcclxuICAgIGRhdGU6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXHJcbiAgICBjb25jZXB0OiAkKFwiI2pvdXJuYWxDb25jZXB0c1wiKS52YWwoKSxcclxuICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcclxuICAgIG1vb2RJZDogcGFyc2VJbnQoJChcIiNqb3VybmFsTW9vZFwiKS52YWwoKSlcclxuICB9O1xyXG4gIHJldHVybiBvYmpUb1N0b3JlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqc29uQ29tcG9uZW50QnVpbGRlclxyXG4iLCIvLyBncmFiYmluZyBqc29uIGZpbGVcclxuXHJcbmxldCBBUEkgPSB7XHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMgKCkge1xyXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIGdldEpvdXJuYWxNb29kcyAoKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvbW9vZHNcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIGdldEpvdXJuYWxFbnRyaWVzV01vb2RzICgpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9fZXhwYW5kPW1vb2RcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIHBvc3RKb3VybmFsRW50cmllcyhqb3VybmFsRW50cnlPYmplY3QpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gIH0sXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5T2JqZWN0KVxyXG4gIH0pfSxcclxuICBnZXRKb3VybmFsRW50cmllc0J5TW9vZCAobW9vZGlkKSB7XHJcbiAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllcz9fZXhwYW5kPW1vb2QmbW9vZElkPSR7bW9vZGlkfWApXHJcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgfSxcclxuICBwb3N0QW5kR2V0IChqb3VybmFsRW50cnlPYmplY3QpIHtcclxuICAgIHJldHVybiB0aGlzLnBvc3RKb3VybmFsRW50cmllcyhqb3VybmFsRW50cnlPYmplY3QpLnRoZW4oKCkgPT4gdGhpcy5nZXRKb3VybmFsRW50cmllc1dNb29kcygpKVxyXG4gIH1cclxuICBcclxufVxyXG5leHBvcnQgZGVmYXVsdCBBUElcclxuXHJcbi8vIF9leHBhbmQ9Y29tcHV0ZXImX2V4cGFuZD1kZXBhcnRtZW50XHJcbiIsImltcG9ydCBjb21wb25lbnQgZnJvbSBcIi4vZW50cnlDb21wb25lbnRcIlxyXG5cclxuXHJcbi8vIC8vIHB1dHMgdGhlIGNyZWF0ZWQgY29tcG9uZW50IGluIHRoZSBET01cclxuXHJcblxyXG5jb25zdCBqb3VybmFsQ29tcG9uZW50ID0ge1xyXG4gIGFkZEJ1aWxkQ29tcG9uZXQgKGpvdXJuYWxFbnRyaWVzKSAge1xyXG4gICAgbGV0IHRleHRJbnNlcnQgPSBcIlwiXHJcbiAgICBqb3VybmFsRW50cmllcy5mb3JFYWNoKCAoZWxlbWVudCkgPT57XHJcbiAgICB0ZXh0SW5zZXJ0ICs9IGNvbXBvbmVudC5idWlsZChlbGVtZW50KTtcclxuICAgICAgfSlcclxuICAgIHJldHVybiB0ZXh0SW5zZXJ0O1xyXG4gIH0gXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpvdXJuYWxDb21wb25lbnQiLCIvLyBjcmVhdGluZyBkaXZcclxuXHJcbiBsZXQgY29tcG9uZW50ID0ge1xyXG4gIGJ1aWxkIChlbGVtZW50KSB7XHJcbiAgICBjb25zb2xlLmxvZyhlbGVtZW50KTtcclxuICByZXR1cm4gYDxkaXYgY2xhc3MgPSBcImluc2VydGVkXCI+XHJcbiAgICA8aDE+JHtlbGVtZW50LmRhdGV9PC9oMT5cclxuICAgIDxoMz4ke2VsZW1lbnQuY29uY2VwdH08L2gzPlxyXG4gICAgPGg0PiR7ZWxlbWVudC5tb29kLm1vb2R9PC9oND5cclxuICAgIDxwPiR7ZWxlbWVudC5lbnRyeX08L3A+XHJcbiAgPC9kaXY+YDtcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQiLCJcclxuXHJcbi8vIFRPRE86IHJlZmFjdG9yIHNvIEkgYW0gYWN0dWFsbHkgdXNpbmcgZnVuY3Rpb25zIHRvIGJ1aWxkIGFsbCBvZiB0aGUgY29tcG9uZW50cyBcclxubGV0IGZvcm1CdWlsZGVyID0ge1xyXG4gIGZvcm1maWVsZHMoKSB7XHJcbiAgICBsZXQgZm9ybUhUTUwgPSBgICBcclxuICAgIDxmb3JtIGFjdGlvbiA9ICcnPlxyXG4gICAgXHJcbiAgICA8IS0tIERhdGUgLS0+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxsYWJlbCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBmb3I9XCJqb3VybmFsRGF0ZVwiPkRhdGUgb2YgZW50cnk8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgIHR5cGUgPSBcImRhdGVcIiBuYW1lPSAnam91cm5hbERhdGUnIGlkPVwiam91cm5hbERhdGVcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgIFxyXG4gICAgPCEtLSBDb25jZXB0cyAtLT5cclxuICAgIDxmaWVsZHNldD5cclxuICAgICAgPGxhYmVsIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIGZvcj1cImpvdXJuYWxDb25jZXB0c1wiPkNvbmNlcHRzIENvdmVyZWQ8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgdHlwZSA9IFwidGV4dFwiIG5hbWU9ICdqb3VybmFsQ29uY2VwdHMnIGlkPVwiam91cm5hbENvbmNlcHRzXCIgbWF4bGVuZ3RoPVwiMTFcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICBcclxuICAgIDwhLS0gRW50cnkgLS0+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxsYWJlbCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBmb3I9XCJqb3VybmFsRW50cnlcIj5Kb3VybmFsIEVudHJ5PC9sYWJlbD5cclxuICAgICAgPHRleHRhcmVhIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIG5hbWUgPVwiam91cm5hbEVudHJ5XCIgaWQgPSBcImpvdXJuYWxFbnRyeVwiIHJvd3MgPSAnNScgY29scz0nMzAnPlR5cGUgeW91ciBlbnRyeSBoZXJlITwvdGV4dGFyZWE+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgIDwhLS0gTW9vZCAtLT5cclxuICAgIDxmaWVsZHNldCBpZCA9IFwicHV0TW9vZEhlcmVcIj5cclxuICAgICBcclxuICAgICAgPCEtLSBTdWJtaXQgLS0+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICA8aW5wdXQgaWQgPSBcInN1Ym1pdFwiIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIHR5cGUgPSBcImJ1dHRvblwiIHZhbHVlPVwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIj5cclxuICA8L2Zvcm0+XHJcbiAgPHNlY3Rpb24gaWQgPSBcInNlY3Rpb25fcmFkaW9zXCI+XHJcbiAgXHJcbiAgPC9zZWN0aW9uPmBcclxuICByZXR1cm4gZm9ybUhUTUw7XHJcbiAgfSxcclxuICBmb3JtSW5zZXJ0UG9pbnQ6ICQoXCIjZm9ybUluc2VydFwiKSxcclxuICBcclxuICBtb29kRHJvcERvd25CdWlsZGVyOiAobW9vZEFycmF5KSA9PiB7XHJcbiAgICBsZXQgZHJvcGRvd24gPSBgPHNlbGVjdCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBuYW1lPVwiam91cm5hbE1vb2RcIiBpZD1cImpvdXJuYWxNb29kXCI+YDtcclxuICAgIG1vb2RBcnJheS5mb3JFYWNoKG1vb2RvYmogPT57XHJcbiAgICAgIGRyb3Bkb3duKz1gPG9wdGlvbiB2YWx1ZT0ke21vb2RvYmouaWR9PiR7bW9vZG9iai5tb29kfTwvb3B0aW9uPmBcclxuICAgIH0pO1xyXG4gICAgZHJvcGRvd24rPWA8L3NlbGVjdD5gO1xyXG4gICAgcmV0dXJuIGRyb3Bkb3duO1xyXG4gIH0sXHJcbiAgcmFkaW9CdWlsZGVyOiAobW9vZEFycmF5KSA9PiB7XHJcbiAgICBsZXQgcmFkaW8gPSBgPGgzPkZpbHRlciBKb3VybmFsIEJ5IE1vb2Q8L2gzPmA7XHJcbiAgICBtb29kQXJyYXkuZm9yRWFjaChtb29kb2JqID0+e1xyXG4gICAgICByYWRpbys9YDxpbnB1dCB0eXBlID0gXCJyYWRpb1wiIGNsYXNzID0gXCJyYWRpb19tb29kXCIgbmFtZSA9IFwibW9vZFwiIHZhbHVlID0gJHttb29kb2JqLmlkfT4ke21vb2RvYmoubW9vZH1gXHJcbiAgICB9KTtcclxuICAgIHJhZGlvKz1gPC9zZWxlY3Q+YDtcclxuICAgIHJldHVybiByYWRpbztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyIiwiaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuZm9ybUJ1aWxkZXIuZm9ybUluc2VydFBvaW50Lmh0bWwoZm9ybUJ1aWxkZXIuZm9ybWZpZWxkcygpKVxyXG5cclxuLy8gZmlyZXMgYW4gYWxlcnQgaWYgdGhlIHRleHQgaXMgbG9uZ2VyIHRoYW4gMTAgY2hhcmFjdGVyc1xyXG5cclxuY29uc3QgY29uY2VwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxDb25jZXB0c1wiKTtcclxuY29uc3QgZW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKTtcclxuXHJcbmNvbnN0IGZvcm1WYWxpZGF0aW9uID0ge1xyXG5cclxuY29uY2VwdHNGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxDb25jZXB0c1wiKS5rZXl1cCgoKSA9PiB7XHJcbiAgaWYgKGNvbmNlcHRzLnZhbHVlLmxlbmd0aD4xMCkge1xyXG4gICAgYWxlcnQoXCJZb3VyIHRleHQgaXMgdG9vIGxvbmdcIik7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmKGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5zaG93KCk7XHJcblxyXG4gIH1cclxufSl9LFxyXG5cclxuZW50cnlGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxFbnRyeVwiKS5rZXl1cCgoKSA9PiB7XHJcbiAgIGlmKGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZXtcclxuICAgICQoXCIjc3VibWl0XCIpLnNob3coKTtcclxuICB9XHJcbn0pXHJcbn19XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtVmFsaWRhdGlvbiIsImltcG9ydCBqc29uQ29tcG9uZW50QnVpbGRlciBmcm9tIFwiLi9idWlsZFN0b3JhZ2VDb21wb25lbnQuanNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2RhdGEuanNcIlxyXG5pbXBvcnQgam91cm5hbENvbXBvbmVudCBmcm9tIFwiLi9lbnRyaWVzRE9NLmpzXCJcclxuaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuaW1wb3J0IGZvcm1WYWxpZGF0aW9uIGZyb20gXCIuL2Zvcm1WYWxpZGF0aW9uLmpzXCJcclxuXHJcblxyXG4vKlxyXG4gICAgTWFpbiBhcHBsaWNhdGlvbiBsb2dpYyB0aGF0IHVzZXMgdGhlIGZ1bmN0aW9ucyBhbmQgb2JqZWN0c1xyXG4gICAgZGVmaW5lZCBpbiB0aGUgb3RoZXIgSmF2YVNjcmlwdCBmaWxlcy5cclxuXHJcbiAgICBDaGFuZ2UgdGhlIGZha2UgdmFyaWFibGUgbmFtZXMgYmVsb3cgdG8gd2hhdCB0aGV5IHNob3VsZCBiZVxyXG4gICAgdG8gZ2V0IHRoZSBkYXRhIGFuZCBkaXNwbGF5IGl0LlxyXG4gICAgKi9cclxuQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4obW9vZE9iakFycmF5ID0+ICQoXCIjcHV0TW9vZEhlcmVcIikuYXBwZW5kKGZvcm1CdWlsZGVyLm1vb2REcm9wRG93bkJ1aWxkZXIobW9vZE9iakFycmF5KSkpO1xyXG5BUEkuZ2V0Sm91cm5hbE1vb2RzKCkudGhlbihtb29kT2JqQXJyYXkgPT4ge1xyXG4gICQoXCIjc2VjdGlvbl9yYWRpb3NcIikuYXBwZW5kKGZvcm1CdWlsZGVyLnJhZGlvQnVpbGRlcihtb29kT2JqQXJyYXkpKVxyXG4gIGxldCBlYWNoUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvX21vb2RcIik7XHJcbiAgZWFjaFJhZGlvLmZvckVhY2gocmFkaW9DbGljayA9PlxyXG4gICAgcmFkaW9DbGljay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IGNsaWNrVmFsdWUgPSByYWRpb0NsaWNrLnZhbHVlO1xyXG4gICAgICBBUEkuZ2V0Sm91cm5hbEVudHJpZXNCeU1vb2QoY2xpY2tWYWx1ZSkudGhlbigoZW50cmllc0J5TW9vZCkgPT4ge1xyXG4gICAgICAgIHRoZVNwb3QudGV4dChudWxsKTtcclxuICAgICAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoZW50cmllc0J5TW9vZCkpXHJcbiAgICAgIH0pXHJcbiAgICB9KSlcclxufSlcclxuXHJcblxyXG5mb3JtVmFsaWRhdGlvbi5lbnRyeUZpbHRlcigpO1xyXG5mb3JtVmFsaWRhdGlvbi5jb25jZXB0c0ZpbHRlcigpO1xyXG5cclxuLy8gdGhlIHNwb3RcclxuY29uc3QgdGhlU3BvdCA9ICQoXCIuc2VjdGlvblwiKTtcclxuLy8gLy8gcHV0cyB0aGUgY3JlYXRlZCBjb21wb25lbnQgaW4gdGhlIERPTVxyXG5sZXQgcHV0QXBpSW5Eb20gPSAoKSA9PiB7XHJcbiAgdGhlU3BvdC5pbm5lckhUTUwgPSBudWxsO1xyXG4gIEFQSS5nZXRKb3VybmFsRW50cmllc1dNb29kcygpLnRoZW4oKHRoZUdvb2RTdHVmZikgPT4ge1xyXG4gICAgdGhlU3BvdC5hcHBlbmQoam91cm5hbENvbXBvbmVudC5hZGRCdWlsZENvbXBvbmV0KHRoZUdvb2RTdHVmZikpXHJcbiAgfSlcclxufVxyXG5wdXRBcGlJbkRvbSgpO1xyXG5cclxuLy8gc3VibWl0cyBkYXRhIGFuZCBwb3N0cyBpbiB0aGUgZG9tXHJcbiQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcclxuICB0aGVTcG90LnRleHQobnVsbCk7XHJcbiAgQVBJLnBvc3RBbmRHZXQoanNvbkNvbXBvbmVudEJ1aWxkZXIoKSkudGhlbigoam91cm5hbEVudHJpZXNmcm9tQVBJKSA9PiB7XHJcbiAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoam91cm5hbEVudHJpZXNmcm9tQVBJKSlcclxuXHJcbiAgfSlcclxufSlcclxuXHJcbi8vIGZpbmRzIGVhY2ggcmFkaW8gYnV0dG9uLCBwdXRzIGEgY2xpY2sgZXZlbnQgb24gdGhlbSBhbmQgZ3JhYnMgdGhlIHZhbHVlIGZyb20gdGhlIGNsaWNrZWQgaXRlbVxyXG5cclxuQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4oKCkgPT4ge1xyXG5cclxufSkiXX0=
