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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkU3RvcmFnZUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2Zvcm1CdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxJQUFJLG9CQUFvQixHQUFHLE1BQU07QUFDN0IsTUFBSSxVQUFVLEdBQUc7QUFDakIsSUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURXO0FBRWpCLElBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRlE7QUFHakIsSUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUhVO0FBSWpCLElBQUEsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBRCxDQUFELENBQWtCLEdBQWxCLEVBQUQ7QUFKQyxHQUFqQjtBQU1GLFNBQU8sVUFBUDtBQUNELENBUkQ7O2VBVWUsb0I7Ozs7Ozs7Ozs7QUNWZjtBQUVBLElBQUksR0FBRyxHQUFHO0FBQ1IsRUFBQSxpQkFBaUIsR0FBSTtBQUNqQixXQUFPLEtBQUssQ0FBQyxzQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUpPOztBQUtSLEVBQUEsZUFBZSxHQUFJO0FBQ2pCLFdBQU8sS0FBSyxDQUFDLDZCQUFELENBQUwsQ0FDQSxJQURBLENBQ0ssUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBRGpCLENBQVA7QUFFRCxHQVJPOztB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QjtBQUNuRCxJQUFBLE9BQU8sQ0FBQyxNQUFSLENBQWUsb0JBQWlCLGdCQUFqQixDQUFrQyxZQUFsQyxDQUFmO0FBQ0QsR0FGRDtBQUdELENBTEQ7O0FBTUEsV0FBVyxHLENBRVg7O0FBQ0EsQ0FBQyxDQUFDLFNBQUQsQ0FBRCxDQUFhLEtBQWIsQ0FBbUIsTUFBTTtBQUN2QixFQUFBLE9BQU8sQ0FBQyxJQUFSLENBQWEsSUFBYjs7QUFDQSxnQkFBSSxVQUFKLENBQWUscUNBQWYsRUFBdUMsSUFBdkMsQ0FBNkMscUJBQUQsSUFBMkI7QUFDckUsSUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFpQixnQkFBakIsQ0FBa0MscUJBQWxDLENBQWY7QUFFRCxHQUhEO0FBSUQsQ0FORCxFLENBUUE7O0FBRUEsY0FBSSxlQUFKLEdBQXNCLElBQXRCLENBQTJCLE1BQU0sQ0FFaEMsQ0FGRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBqc29uQ29tcG9uZW50QnVpbGRlciA9ICgpID0+IHtcclxuICAgIGxldCBvYmpUb1N0b3JlID0ge1xyXG4gICAgZGF0ZTogJChcIiNqb3VybmFsRGF0ZVwiKS52YWwoKSxcclxuICAgIGNvbmNlcHQ6ICQoXCIjam91cm5hbENvbmNlcHRzXCIpLnZhbCgpLFxyXG4gICAgZW50cnk6ICQoXCIjam91cm5hbEVudHJ5XCIpLnZhbCgpLFxyXG4gICAgbW9vZElkOiBwYXJzZUludCgkKFwiI2pvdXJuYWxNb29kXCIpLnZhbCgpKVxyXG4gIH07XHJcbiAgcmV0dXJuIG9ialRvU3RvcmU7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGpzb25Db21wb25lbnRCdWlsZGVyXHJcbiIsIi8vIGdyYWJiaW5nIGpzb24gZmlsZVxyXG5cclxubGV0IEFQSSA9IHtcclxuICBnZXRKb3VybmFsRW50cmllcyAoKSB7XHJcbiAgICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgZ2V0Sm91cm5hbE1vb2RzICgpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9tb29kc1wiKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgZ2V0Sm91cm5hbEVudHJpZXNXTW9vZHMgKCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2pvdXJuYWxFbnRyaWVzP19leHBhbmQ9bW9vZFwiKVxyXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gIH0sXHJcbiAgcG9zdEpvdXJuYWxFbnRyaWVzKGpvdXJuYWxFbnRyeU9iamVjdCkge1xyXG4gICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2pvdXJuYWxFbnRyaWVzXCIsIHtcclxuICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICBoZWFkZXJzOiB7XHJcbiAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgfSxcclxuICBib2R5OiBKU09OLnN0cmluZ2lmeShqb3VybmFsRW50cnlPYmplY3QpXHJcbiAgfSl9LFxyXG4gIGdldEpvdXJuYWxFbnRyaWVzQnlNb29kIChtb29kaWQpIHtcclxuICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2pvdXJuYWxFbnRyaWVzP19leHBhbmQ9bW9vZCZtb29kSWQ9JHttb29kaWR9YClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIHBvc3RBbmRHZXQgKGpvdXJuYWxFbnRyeU9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zdEpvdXJuYWxFbnRyaWVzKGpvdXJuYWxFbnRyeU9iamVjdCkudGhlbigoKSA9PiB0aGlzLmdldEpvdXJuYWxFbnRyaWVzV01vb2RzKCkpXHJcbiAgfVxyXG4gIFxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEFQSVxyXG5cclxuLy8gX2V4cGFuZD1jb21wdXRlciZfZXhwYW5kPWRlcGFydG1lbnRcclxuIiwiaW1wb3J0IGNvbXBvbmVudCBmcm9tIFwiLi9lbnRyeUNvbXBvbmVudFwiXHJcblxyXG5cclxuLy8gLy8gcHV0cyB0aGUgY3JlYXRlZCBjb21wb25lbnQgaW4gdGhlIERPTVxyXG5cclxuXHJcbmNvbnN0IGpvdXJuYWxDb21wb25lbnQgPSB7XHJcbiAgYWRkQnVpbGRDb21wb25ldCAoam91cm5hbEVudHJpZXMpICB7XHJcbiAgICBsZXQgdGV4dEluc2VydCA9IFwiXCJcclxuICAgIGpvdXJuYWxFbnRyaWVzLmZvckVhY2goIChlbGVtZW50KSA9PntcclxuICAgIHRleHRJbnNlcnQgKz0gY29tcG9uZW50LmJ1aWxkKGVsZW1lbnQpO1xyXG4gICAgICB9KVxyXG4gICAgcmV0dXJuIHRleHRJbnNlcnQ7XHJcbiAgfSBcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgam91cm5hbENvbXBvbmVudCIsIi8vIGNyZWF0aW5nIGRpdlxyXG5cclxuIGxldCBjb21wb25lbnQgPSB7XHJcbiAgYnVpbGQgKGVsZW1lbnQpIHtcclxuICByZXR1cm4gYDxkaXYgY2xhc3MgPSBcImluc2VydGVkXCI+XHJcbiAgICA8aDE+JHtlbGVtZW50LmRhdGV9PC9oMT5cclxuICAgIDxoMz4ke2VsZW1lbnQuY29uY2VwdH08L2gzPlxyXG4gICAgPGg0PiR7ZWxlbWVudC5tb29kLm1vb2R9PC9oND5cclxuICAgIDxwPiR7ZWxlbWVudC5lbnRyeX08L3A+XHJcbiAgPC9kaXY+YDtcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQiLCJcclxuXHJcbi8vIFRPRE86IHJlZmFjdG9yIHNvIEkgYW0gYWN0dWFsbHkgdXNpbmcgZnVuY3Rpb25zIHRvIGJ1aWxkIGFsbCBvZiB0aGUgY29tcG9uZW50cyBcclxubGV0IGZvcm1CdWlsZGVyID0ge1xyXG4gIGZvcm1maWVsZHMoKSB7XHJcbiAgICBsZXQgZm9ybUhUTUwgPSBgICBcclxuICAgIDxmb3JtIGFjdGlvbiA9ICcnPlxyXG4gICAgXHJcbiAgICA8IS0tIERhdGUgLS0+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxsYWJlbCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBmb3I9XCJqb3VybmFsRGF0ZVwiPkRhdGUgb2YgZW50cnk8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgIHR5cGUgPSBcImRhdGVcIiBuYW1lPSAnam91cm5hbERhdGUnIGlkPVwiam91cm5hbERhdGVcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgIFxyXG4gICAgPCEtLSBDb25jZXB0cyAtLT5cclxuICAgIDxmaWVsZHNldD5cclxuICAgICAgPGxhYmVsIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIGZvcj1cImpvdXJuYWxDb25jZXB0c1wiPkNvbmNlcHRzIENvdmVyZWQ8L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgdHlwZSA9IFwidGV4dFwiIG5hbWU9ICdqb3VybmFsQ29uY2VwdHMnIGlkPVwiam91cm5hbENvbmNlcHRzXCIgbWF4bGVuZ3RoPVwiMTFcIj5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICBcclxuICAgIDwhLS0gRW50cnkgLS0+XHJcbiAgICA8ZmllbGRzZXQ+XHJcbiAgICAgIDxsYWJlbCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBmb3I9XCJqb3VybmFsRW50cnlcIj5Kb3VybmFsIEVudHJ5PC9sYWJlbD5cclxuICAgICAgPHRleHRhcmVhIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIG5hbWUgPVwiam91cm5hbEVudHJ5XCIgaWQgPSBcImpvdXJuYWxFbnRyeVwiIHJvd3MgPSAnNScgY29scz0nMzAnPlR5cGUgeW91ciBlbnRyeSBoZXJlITwvdGV4dGFyZWE+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG5cclxuICAgIDwhLS0gTW9vZCAtLT5cclxuICAgIDxmaWVsZHNldCBpZCA9IFwicHV0TW9vZEhlcmVcIj5cclxuICAgICBcclxuICAgICAgPCEtLSBTdWJtaXQgLS0+XHJcbiAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICA8aW5wdXQgaWQgPSBcInN1Ym1pdFwiIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIHR5cGUgPSBcImJ1dHRvblwiIHZhbHVlPVwiUmVjb3JkIEpvdXJuYWwgRW50cnlcIj5cclxuICA8L2Zvcm0+XHJcbiAgPHNlY3Rpb24gaWQgPSBcInNlY3Rpb25fcmFkaW9zXCI+XHJcbiAgXHJcbiAgPC9zZWN0aW9uPmBcclxuICByZXR1cm4gZm9ybUhUTUw7XHJcbiAgfSxcclxuICBmb3JtSW5zZXJ0UG9pbnQ6ICQoXCIjZm9ybUluc2VydFwiKSxcclxuICBcclxuICBtb29kRHJvcERvd25CdWlsZGVyOiAobW9vZEFycmF5KSA9PiB7XHJcbiAgICBsZXQgZHJvcGRvd24gPSBgPHNlbGVjdCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBuYW1lPVwiam91cm5hbE1vb2RcIiBpZD1cImpvdXJuYWxNb29kXCI+YDtcclxuICAgIG1vb2RBcnJheS5mb3JFYWNoKG1vb2RvYmogPT57XHJcbiAgICAgIGRyb3Bkb3duKz1gPG9wdGlvbiB2YWx1ZT0ke21vb2RvYmouaWR9PiR7bW9vZG9iai5tb29kfTwvb3B0aW9uPmBcclxuICAgIH0pO1xyXG4gICAgZHJvcGRvd24rPWA8L3NlbGVjdD5gO1xyXG4gICAgcmV0dXJuIGRyb3Bkb3duO1xyXG4gIH0sXHJcbiAgcmFkaW9CdWlsZGVyOiAobW9vZEFycmF5KSA9PiB7XHJcbiAgICBsZXQgcmFkaW8gPSBgPGgzPkZpbHRlciBKb3VybmFsIEJ5IE1vb2Q8L2gzPmA7XHJcbiAgICBtb29kQXJyYXkuZm9yRWFjaChtb29kb2JqID0+e1xyXG4gICAgICByYWRpbys9YDxpbnB1dCB0eXBlID0gXCJyYWRpb1wiIGNsYXNzID0gXCJyYWRpb19tb29kXCIgbmFtZSA9IFwibW9vZFwiIHZhbHVlID0gJHttb29kb2JqLmlkfT4ke21vb2RvYmoubW9vZH1gXHJcbiAgICB9KTtcclxuICAgIHJhZGlvKz1gPC9zZWxlY3Q+YDtcclxuICAgIHJldHVybiByYWRpbztcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyIiwiaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuZm9ybUJ1aWxkZXIuZm9ybUluc2VydFBvaW50Lmh0bWwoZm9ybUJ1aWxkZXIuZm9ybWZpZWxkcygpKVxyXG5cclxuLy8gZmlyZXMgYW4gYWxlcnQgaWYgdGhlIHRleHQgaXMgbG9uZ2VyIHRoYW4gMTAgY2hhcmFjdGVyc1xyXG5cclxuY29uc3QgY29uY2VwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxDb25jZXB0c1wiKTtcclxuY29uc3QgZW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKTtcclxuXHJcbmNvbnN0IGZvcm1WYWxpZGF0aW9uID0ge1xyXG5cclxuY29uY2VwdHNGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxDb25jZXB0c1wiKS5rZXl1cCgoKSA9PiB7XHJcbiAgaWYgKGNvbmNlcHRzLnZhbHVlLmxlbmd0aD4xMCkge1xyXG4gICAgYWxlcnQoXCJZb3VyIHRleHQgaXMgdG9vIGxvbmdcIik7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmKGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5zaG93KCk7XHJcblxyXG4gIH1cclxufSl9LFxyXG5cclxuZW50cnlGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxFbnRyeVwiKS5rZXl1cCgoKSA9PiB7XHJcbiAgIGlmKGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZXtcclxuICAgICQoXCIjc3VibWl0XCIpLnNob3coKTtcclxuICB9XHJcbn0pXHJcbn19XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtVmFsaWRhdGlvbiIsImltcG9ydCBqc29uQ29tcG9uZW50QnVpbGRlciBmcm9tIFwiLi9idWlsZFN0b3JhZ2VDb21wb25lbnQuanNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2RhdGEuanNcIlxyXG5pbXBvcnQgam91cm5hbENvbXBvbmVudCBmcm9tIFwiLi9lbnRyaWVzRE9NLmpzXCJcclxuaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuaW1wb3J0IGZvcm1WYWxpZGF0aW9uIGZyb20gXCIuL2Zvcm1WYWxpZGF0aW9uLmpzXCJcclxuXHJcblxyXG4vKlxyXG4gICAgTWFpbiBhcHBsaWNhdGlvbiBsb2dpYyB0aGF0IHVzZXMgdGhlIGZ1bmN0aW9ucyBhbmQgb2JqZWN0c1xyXG4gICAgZGVmaW5lZCBpbiB0aGUgb3RoZXIgSmF2YVNjcmlwdCBmaWxlcy5cclxuXHJcbiAgICBDaGFuZ2UgdGhlIGZha2UgdmFyaWFibGUgbmFtZXMgYmVsb3cgdG8gd2hhdCB0aGV5IHNob3VsZCBiZVxyXG4gICAgdG8gZ2V0IHRoZSBkYXRhIGFuZCBkaXNwbGF5IGl0LlxyXG4gICAgKi9cclxuQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4obW9vZE9iakFycmF5ID0+ICQoXCIjcHV0TW9vZEhlcmVcIikuYXBwZW5kKGZvcm1CdWlsZGVyLm1vb2REcm9wRG93bkJ1aWxkZXIobW9vZE9iakFycmF5KSkpO1xyXG5BUEkuZ2V0Sm91cm5hbE1vb2RzKCkudGhlbihtb29kT2JqQXJyYXkgPT4ge1xyXG4gICQoXCIjc2VjdGlvbl9yYWRpb3NcIikuYXBwZW5kKGZvcm1CdWlsZGVyLnJhZGlvQnVpbGRlcihtb29kT2JqQXJyYXkpKVxyXG4gIGxldCBlYWNoUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhZGlvX21vb2RcIik7XHJcbiAgZWFjaFJhZGlvLmZvckVhY2gocmFkaW9DbGljayA9PlxyXG4gICAgcmFkaW9DbGljay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgbGV0IGNsaWNrVmFsdWUgPSByYWRpb0NsaWNrLnZhbHVlO1xyXG4gICAgICBBUEkuZ2V0Sm91cm5hbEVudHJpZXNCeU1vb2QoY2xpY2tWYWx1ZSkudGhlbigoZW50cmllc0J5TW9vZCkgPT4ge1xyXG4gICAgICAgIHRoZVNwb3QudGV4dChudWxsKTtcclxuICAgICAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoZW50cmllc0J5TW9vZCkpXHJcbiAgICAgIH0pXHJcbiAgICB9KSlcclxufSlcclxuXHJcblxyXG5mb3JtVmFsaWRhdGlvbi5lbnRyeUZpbHRlcigpO1xyXG5mb3JtVmFsaWRhdGlvbi5jb25jZXB0c0ZpbHRlcigpO1xyXG5cclxuLy8gdGhlIHNwb3RcclxuY29uc3QgdGhlU3BvdCA9ICQoXCIuc2VjdGlvblwiKTtcclxuLy8gLy8gcHV0cyB0aGUgY3JlYXRlZCBjb21wb25lbnQgaW4gdGhlIERPTVxyXG5sZXQgcHV0QXBpSW5Eb20gPSAoKSA9PiB7XHJcbiAgdGhlU3BvdC5pbm5lckhUTUwgPSBudWxsO1xyXG4gIEFQSS5nZXRKb3VybmFsRW50cmllc1dNb29kcygpLnRoZW4oKHRoZUdvb2RTdHVmZikgPT4ge1xyXG4gICAgdGhlU3BvdC5hcHBlbmQoam91cm5hbENvbXBvbmVudC5hZGRCdWlsZENvbXBvbmV0KHRoZUdvb2RTdHVmZikpXHJcbiAgfSlcclxufVxyXG5wdXRBcGlJbkRvbSgpO1xyXG5cclxuLy8gc3VibWl0cyBkYXRhIGFuZCBwb3N0cyBpbiB0aGUgZG9tXHJcbiQoXCIjc3VibWl0XCIpLmNsaWNrKCgpID0+IHtcclxuICB0aGVTcG90LnRleHQobnVsbCk7XHJcbiAgQVBJLnBvc3RBbmRHZXQoanNvbkNvbXBvbmVudEJ1aWxkZXIoKSkudGhlbigoam91cm5hbEVudHJpZXNmcm9tQVBJKSA9PiB7XHJcbiAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoam91cm5hbEVudHJpZXNmcm9tQVBJKSlcclxuXHJcbiAgfSlcclxufSlcclxuXHJcbi8vIGZpbmRzIGVhY2ggcmFkaW8gYnV0dG9uLCBwdXRzIGEgY2xpY2sgZXZlbnQgb24gdGhlbSBhbmQgZ3JhYnMgdGhlIHZhbHVlIGZyb20gdGhlIGNsaWNrZWQgaXRlbVxyXG5cclxuQVBJLmdldEpvdXJuYWxNb29kcygpLnRoZW4oKCkgPT4ge1xyXG5cclxufSkiXX0=
