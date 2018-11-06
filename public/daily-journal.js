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
    mood: $("#journalMood").val()
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

  postJournalEntries(journalEntryObject) {
    return fetch("http://localhost:8088/journalEntries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(journalEntryObject)
    });
  },

  getJournalEntriesByMood(mood) {
    return fetch(`http://localhost:8088/journalEntries?mood=${mood}`).then(response => response.json());
  },

  postAndGet(journalEntryObject) {
    return this.postJournalEntries(journalEntryObject).then(() => this.getJournalEntries());
  }

};
var _default = API;
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
    <h4>${element.mood}</h4>
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

  </section>`;
    return formHTML;
  },

  formInsertPoint: $("#formInsert")
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

var _formValidation = _interopRequireDefault(require("./formValidation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
    Main application logic that uses the functions and objects
    defined in the other JavaScript files.

    Change the fake variable names below to what they should be
    to get the data and display it.
    */
_formValidation.default.entryFilter();

_formValidation.default.conceptsFilter(); // the spot


const theSpot = $(".section"); // // puts the created component in the DOM

let putApiInDom = () => {
  theSpot.innerHTML = null;

  _data.default.getJournalEntries().then(theGoodStuff => {
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

let eachRadio = document.querySelectorAll(".radio_mood");
eachRadio.forEach(radioClick => radioClick.addEventListener('click', () => {
  let clickValue = radioClick.value;

  _data.default.getJournalEntriesByMood(clickValue).then(entriesByMood => {
    theSpot.text(null);
    theSpot.append(_entriesDOM.default.addBuildComponet(entriesByMood));
  });
}));

},{"./buildStorageComponent.js":1,"./data.js":2,"./entriesDOM.js":3,"./formValidation.js":6}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL2J1aWxkU3RvcmFnZUNvbXBvbmVudC5qcyIsIi4uL3NjcmlwdHMvZGF0YS5qcyIsIi4uL3NjcmlwdHMvZW50cmllc0RPTS5qcyIsIi4uL3NjcmlwdHMvZW50cnlDb21wb25lbnQuanMiLCIuLi9zY3JpcHRzL2Zvcm1CdWlsZGVyLmpzIiwiLi4vc2NyaXB0cy9mb3JtVmFsaWRhdGlvbi5qcyIsIi4uL3NjcmlwdHMvam91cm5hbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7QUNBQSxJQUFJLG9CQUFvQixHQUFHLE1BQU07QUFDN0IsTUFBSSxVQUFVLEdBQUc7QUFDakIsSUFBQSxJQUFJLEVBQUUsQ0FBQyxDQUFDLGNBQUQsQ0FBRCxDQUFrQixHQUFsQixFQURXO0FBRWpCLElBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCLEdBQXRCLEVBRlE7QUFHakIsSUFBQSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGVBQUQsQ0FBRCxDQUFtQixHQUFuQixFQUhVO0FBSWpCLElBQUEsSUFBSSxFQUFFLENBQUMsQ0FBQyxjQUFELENBQUQsQ0FBa0IsR0FBbEI7QUFKVyxHQUFqQjtBQU1GLFNBQU8sVUFBUDtBQUNELENBUkQ7O2VBVWUsb0I7Ozs7Ozs7Ozs7QUNWZjtBQUVBLElBQUksR0FBRyxHQUFHO0FBQ1IsRUFBQSxpQkFBaUIsR0FBSTtBQUNqQixXQUFPLEtBQUssQ0FBQyxzQ0FBRCxDQUFMLENBQ0YsSUFERSxDQUNHLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQURmLENBQVA7QUFFSCxHQUpPOztBQUtSLEVBQUEsa0JBQWtCLENBQUMsa0JBQUQsRUFBcUI7QUFDckMsV0FBTyxLQUFLLENBQUMsc0NBQUQsRUFBeUM7QUFDckQsTUFBQSxNQUFNLEVBQUUsTUFENkM7QUFFckQsTUFBQSxPQUFPLEVBQUU7QUFDUCx3QkFBZ0I7QUFE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QVUsQ0FBQyxnQkFBWCxDQUE0QixPQUE1QixFQUFxQyxNQUFNO0FBQ3pDLE1BQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxLQUE1Qjs7QUFDQSxnQkFBSSx1QkFBSixDQUE0QixVQUE1QixFQUF3QyxJQUF4QyxDQUE4QyxhQUFELElBQW1CO0FBQzlELElBQUEsT0FBTyxDQUFDLElBQVIsQ0FBYSxJQUFiO0FBQ0EsSUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLG9CQUFpQixnQkFBakIsQ0FBa0MsYUFBbEMsQ0FBZjtBQUNELEdBSEQ7QUFJQyxDQU5ILENBREYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJsZXQganNvbkNvbXBvbmVudEJ1aWxkZXIgPSAoKSA9PiB7XHJcbiAgICBsZXQgb2JqVG9TdG9yZSA9IHtcclxuICAgIGRhdGU6ICQoXCIjam91cm5hbERhdGVcIikudmFsKCksXHJcbiAgICBjb25jZXB0OiAkKFwiI2pvdXJuYWxDb25jZXB0c1wiKS52YWwoKSxcclxuICAgIGVudHJ5OiAkKFwiI2pvdXJuYWxFbnRyeVwiKS52YWwoKSxcclxuICAgIG1vb2Q6ICQoXCIjam91cm5hbE1vb2RcIikudmFsKClcclxuICB9O1xyXG4gIHJldHVybiBvYmpUb1N0b3JlO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqc29uQ29tcG9uZW50QnVpbGRlclxyXG4iLCIvLyBncmFiYmluZyBqc29uIGZpbGVcclxuXHJcbmxldCBBUEkgPSB7XHJcbiAgZ2V0Sm91cm5hbEVudHJpZXMgKCkge1xyXG4gICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXNcIilcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIHBvc3RKb3VybmFsRW50cmllcyhqb3VybmFsRW50cnlPYmplY3QpIHtcclxuICAgIHJldHVybiBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9qb3VybmFsRW50cmllc1wiLCB7XHJcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgaGVhZGVyczoge1xyXG4gICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gIH0sXHJcbiAgYm9keTogSlNPTi5zdHJpbmdpZnkoam91cm5hbEVudHJ5T2JqZWN0KVxyXG4gIH0pfSxcclxuICBnZXRKb3VybmFsRW50cmllc0J5TW9vZCAobW9vZCkge1xyXG4gICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvam91cm5hbEVudHJpZXM/bW9vZD0ke21vb2R9YClcclxuICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICB9LFxyXG4gIHBvc3RBbmRHZXQgKGpvdXJuYWxFbnRyeU9iamVjdCkge1xyXG4gICAgcmV0dXJuIHRoaXMucG9zdEpvdXJuYWxFbnRyaWVzKGpvdXJuYWxFbnRyeU9iamVjdCkudGhlbigoKSA9PiB0aGlzLmdldEpvdXJuYWxFbnRyaWVzKCkpXHJcbiAgfVxyXG4gIFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJpbXBvcnQgY29tcG9uZW50IGZyb20gXCIuL2VudHJ5Q29tcG9uZW50XCJcclxuXHJcblxyXG4vLyAvLyBwdXRzIHRoZSBjcmVhdGVkIGNvbXBvbmVudCBpbiB0aGUgRE9NXHJcblxyXG5cclxuY29uc3Qgam91cm5hbENvbXBvbmVudCA9IHtcclxuICBhZGRCdWlsZENvbXBvbmV0IChqb3VybmFsRW50cmllcykgIHtcclxuICAgIGxldCB0ZXh0SW5zZXJ0ID0gXCJcIlxyXG4gICAgam91cm5hbEVudHJpZXMuZm9yRWFjaCggKGVsZW1lbnQpID0+e1xyXG4gICAgdGV4dEluc2VydCArPSBjb21wb25lbnQuYnVpbGQoZWxlbWVudCk7XHJcbiAgICAgIH0pXHJcbiAgICByZXR1cm4gdGV4dEluc2VydDtcclxuICB9IFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBqb3VybmFsQ29tcG9uZW50IiwiLy8gY3JlYXRpbmcgZGl2XHJcblxyXG4gbGV0IGNvbXBvbmVudCA9IHtcclxuICBidWlsZCAoZWxlbWVudCkge1xyXG4gIHJldHVybiBgPGRpdiBjbGFzcyA9IFwiaW5zZXJ0ZWRcIj5cclxuICAgIDxoMT4ke2VsZW1lbnQuZGF0ZX08L2gxPlxyXG4gICAgPGgzPiR7ZWxlbWVudC5jb25jZXB0fTwvaDM+XHJcbiAgICA8aDQ+JHtlbGVtZW50Lm1vb2R9PC9oND5cclxuICAgIDxwPiR7ZWxlbWVudC5lbnRyeX08L3A+XHJcbiAgPC9kaXY+YDtcclxufVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQiLCIvLyBUT0RPOiByZWZhY3RvciBzbyBJIGFtIGFjdHVhbGx5IHVzaW5nIGZ1bmN0aW9ucyB0byBidWlsZCBhbGwgb2YgdGhlIGNvbXBvbmVudHMgXHJcblxyXG5sZXQgZm9ybUJ1aWxkZXIgPSB7XHJcbiAgZm9ybWZpZWxkcygpIHtcclxuICAgIGxldCBmb3JtSFRNTCA9IGAgIFxyXG4gICAgPGZvcm0gYWN0aW9uID0gJyc+XHJcbiAgICBcclxuICAgIDwhLS0gRGF0ZSAtLT5cclxuICAgIDxmaWVsZHNldD5cclxuICAgICAgPGxhYmVsIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIGZvcj1cImpvdXJuYWxEYXRlXCI+RGF0ZSBvZiBlbnRyeTwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCAgdHlwZSA9IFwiZGF0ZVwiIG5hbWU9ICdqb3VybmFsRGF0ZScgaWQ9XCJqb3VybmFsRGF0ZVwiPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgXHJcbiAgICA8IS0tIENvbmNlcHRzIC0tPlxyXG4gICAgPGZpZWxkc2V0PlxyXG4gICAgICA8bGFiZWwgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgZm9yPVwiam91cm5hbENvbmNlcHRzXCI+Q29uY2VwdHMgQ292ZXJlZDwvbGFiZWw+XHJcbiAgICAgIDxpbnB1dCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiB0eXBlID0gXCJ0ZXh0XCIgbmFtZT0gJ2pvdXJuYWxDb25jZXB0cycgaWQ9XCJqb3VybmFsQ29uY2VwdHNcIiBtYXhsZW5ndGg9XCIxMVwiPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgIFxyXG4gICAgPCEtLSBFbnRyeSAtLT5cclxuICAgIDxmaWVsZHNldD5cclxuICAgICAgPGxhYmVsIGNsYXNzID0gXCJmb3JtX19maWVsZHMtLWZsb2F0c1wiIGZvcj1cImpvdXJuYWxFbnRyeVwiPkpvdXJuYWwgRW50cnk8L2xhYmVsPlxyXG4gICAgICA8dGV4dGFyZWEgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgbmFtZSA9XCJqb3VybmFsRW50cnlcIiBpZCA9IFwiam91cm5hbEVudHJ5XCIgcm93cyA9ICc1JyBjb2xzPSczMCc+VHlwZSB5b3VyIGVudHJ5IGhlcmUhPC90ZXh0YXJlYT5cclxuICAgIDwvZmllbGRzZXQ+XHJcblxyXG4gICAgPCEtLSBNb29kIC0tPlxyXG4gICAgPGZpZWxkc2V0PlxyXG4gICAgICA8bGFiZWwgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgZm9yPVwiam91cm5hbE1vb2RcIj5Nb29kIGZvciB0aGUgZGF5PC9sYWJlbD5cclxuICAgICAgPHNlbGVjdCBjbGFzcyA9IFwiZm9ybV9fZmllbGRzLS1mbG9hdHNcIiBuYW1lPVwiam91cm5hbE1vb2RcIiBpZD1cImpvdXJuYWxNb29kXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwic2FkXCI+U2FkPC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaGFwcHlcIj5IYXBweTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm9rXCI+T2s8L29wdGlvbj5cclxuICAgICAgPC9zZWxlY3Q+XHJcblxyXG4gICAgICA8IS0tIFN1Ym1pdCAtLT5cclxuICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgIDxpbnB1dCBpZCA9IFwic3VibWl0XCIgY2xhc3MgPSBcImZvcm1fX2ZpZWxkcy0tZmxvYXRzXCIgdHlwZSA9IFwiYnV0dG9uXCIgdmFsdWU9XCJSZWNvcmQgSm91cm5hbCBFbnRyeVwiPlxyXG4gIDwvZm9ybT5cclxuICA8c2VjdGlvbiBpZCA9IFwic2VjdGlvbl9yYWRpb3NcIj5cclxuICAgIDxoMz5GaWx0ZXIgSm91cm5hbCBCeSBNb29kPC9oMz5cclxuICAgIDxpbnB1dCB0eXBlID0gXCJyYWRpb1wiIGNsYXNzID0gXCJyYWRpb19tb29kXCIgbmFtZSA9IFwibW9vZFwiIHZhbHVlID0gXCJzYWRcIj5TYWRcclxuICAgIDxpbnB1dCB0eXBlID0gXCJyYWRpb1wiIGNsYXNzID0gXCJyYWRpb19tb29kXCIgbmFtZSA9IFwibW9vZFwiIHZhbHVlID0gXCJoYXBweVwiPkhhcHB5XHJcbiAgICA8aW5wdXQgdHlwZSA9IFwicmFkaW9cIiBjbGFzcyA9IFwicmFkaW9fbW9vZFwiIG5hbWUgPSBcIm1vb2RcIiB2YWx1ZSA9IFwib2tcIj5Pa1xyXG5cclxuICA8L3NlY3Rpb24+YFxyXG4gIHJldHVybiBmb3JtSFRNTDtcclxuICB9LFxyXG4gIGZvcm1JbnNlcnRQb2ludDogJChcIiNmb3JtSW5zZXJ0XCIpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZvcm1CdWlsZGVyIiwiaW1wb3J0IGZvcm1CdWlsZGVyIGZyb20gXCIuL2Zvcm1CdWlsZGVyLmpzXCJcclxuZm9ybUJ1aWxkZXIuZm9ybUluc2VydFBvaW50Lmh0bWwoZm9ybUJ1aWxkZXIuZm9ybWZpZWxkcygpKVxyXG5cclxuLy8gZmlyZXMgYW4gYWxlcnQgaWYgdGhlIHRleHQgaXMgbG9uZ2VyIHRoYW4gMTAgY2hhcmFjdGVyc1xyXG5cclxuY29uc3QgY29uY2VwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxDb25jZXB0c1wiKTtcclxuY29uc3QgZW50cnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvdXJuYWxFbnRyeVwiKTtcclxuXHJcbmNvbnN0IGZvcm1WYWxpZGF0aW9uID0ge1xyXG5cclxuY29uY2VwdHNGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxDb25jZXB0c1wiKS5rZXl1cCgoKSA9PiB7XHJcbiAgaWYgKGNvbmNlcHRzLnZhbHVlLmxlbmd0aD4xMCkge1xyXG4gICAgYWxlcnQoXCJZb3VyIHRleHQgaXMgdG9vIGxvbmdcIik7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5oaWRlKCk7XHJcbiAgfSBlbHNlIGlmKGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGNvbmNlcHRzLnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKFwiI3N1Ym1pdFwiKS5zaG93KCk7XHJcblxyXG4gIH1cclxufSl9LFxyXG5cclxuZW50cnlGaWx0ZXI6ICgpID0+IHskKFwiI2pvdXJuYWxFbnRyeVwiKS5rZXl1cCgoKSA9PiB7XHJcbiAgIGlmKGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwiZnVja1wiKSB8fGVudHJ5LnZhbHVlLmluY2x1ZGVzKFwic2hpdFwiKSl7XHJcbiAgICBhbGVydChcIlRoYXQncyBub3QgYSBuaWNlIHRoaW5nIHRvIHNheVwiKVxyXG4gICAgJChcIiNzdWJtaXRcIikuaGlkZSgpO1xyXG4gIH0gZWxzZXtcclxuICAgICQoXCIjc3VibWl0XCIpLnNob3coKTtcclxuICB9XHJcbn0pXHJcbn19XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb3JtVmFsaWRhdGlvbiIsImltcG9ydCBqc29uQ29tcG9uZW50QnVpbGRlciBmcm9tIFwiLi9idWlsZFN0b3JhZ2VDb21wb25lbnQuanNcIlxyXG5pbXBvcnQgQVBJIGZyb20gXCIuL2RhdGEuanNcIlxyXG5pbXBvcnQgam91cm5hbENvbXBvbmVudCBmcm9tIFwiLi9lbnRyaWVzRE9NLmpzXCJcclxuaW1wb3J0IGZvcm1WYWxpZGF0aW9uIGZyb20gXCIuL2Zvcm1WYWxpZGF0aW9uLmpzXCJcclxuXHJcblxyXG4vKlxyXG4gICAgTWFpbiBhcHBsaWNhdGlvbiBsb2dpYyB0aGF0IHVzZXMgdGhlIGZ1bmN0aW9ucyBhbmQgb2JqZWN0c1xyXG4gICAgZGVmaW5lZCBpbiB0aGUgb3RoZXIgSmF2YVNjcmlwdCBmaWxlcy5cclxuXHJcbiAgICBDaGFuZ2UgdGhlIGZha2UgdmFyaWFibGUgbmFtZXMgYmVsb3cgdG8gd2hhdCB0aGV5IHNob3VsZCBiZVxyXG4gICAgdG8gZ2V0IHRoZSBkYXRhIGFuZCBkaXNwbGF5IGl0LlxyXG4gICAgKi9cclxuICAgXHJcblxyXG5mb3JtVmFsaWRhdGlvbi5lbnRyeUZpbHRlcigpO1xyXG5mb3JtVmFsaWRhdGlvbi5jb25jZXB0c0ZpbHRlcigpO1xyXG5cclxuLy8gdGhlIHNwb3RcclxuY29uc3QgdGhlU3BvdCA9ICQoXCIuc2VjdGlvblwiKTtcclxuLy8gLy8gcHV0cyB0aGUgY3JlYXRlZCBjb21wb25lbnQgaW4gdGhlIERPTVxyXG5sZXQgcHV0QXBpSW5Eb20gPSAoKSA9PiB7XHJcbiAgdGhlU3BvdC5pbm5lckhUTUwgPSBudWxsOyBcclxuICBBUEkuZ2V0Sm91cm5hbEVudHJpZXMoKS50aGVuKCh0aGVHb29kU3R1ZmYpID0+IHtcclxuICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQodGhlR29vZFN0dWZmKSlcclxufSl9XHJcbnB1dEFwaUluRG9tKCk7XHJcblxyXG4vLyBzdWJtaXRzIGRhdGEgYW5kIHBvc3RzIGluIHRoZSBkb21cclxuJChcIiNzdWJtaXRcIikuY2xpY2soKCkgPT4geyBcclxuICB0aGVTcG90LnRleHQobnVsbCk7XHJcbiAgQVBJLnBvc3RBbmRHZXQoanNvbkNvbXBvbmVudEJ1aWxkZXIoKSkudGhlbigoam91cm5hbEVudHJpZXNmcm9tQVBJKSA9PiB7XHJcbiAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoam91cm5hbEVudHJpZXNmcm9tQVBJKSlcclxuXHJcbiAgfSlcclxufSlcclxuXHJcbi8vIGZpbmRzIGVhY2ggcmFkaW8gYnV0dG9uLCBwdXRzIGEgY2xpY2sgZXZlbnQgb24gdGhlbSBhbmQgZ3JhYnMgdGhlIHZhbHVlIGZyb20gdGhlIGNsaWNrZWQgaXRlbVxyXG5sZXQgZWFjaFJhZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYWRpb19tb29kXCIpO1xyXG5lYWNoUmFkaW8uZm9yRWFjaCggcmFkaW9DbGljayA9PlxyXG4gIHJhZGlvQ2xpY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICBsZXQgY2xpY2tWYWx1ZSA9IHJhZGlvQ2xpY2sudmFsdWU7XHJcbiAgICBBUEkuZ2V0Sm91cm5hbEVudHJpZXNCeU1vb2QoY2xpY2tWYWx1ZSkudGhlbigoZW50cmllc0J5TW9vZCkgPT4ge1xyXG4gICAgICB0aGVTcG90LnRleHQobnVsbCk7IFxyXG4gICAgICB0aGVTcG90LmFwcGVuZChqb3VybmFsQ29tcG9uZW50LmFkZEJ1aWxkQ29tcG9uZXQoZW50cmllc0J5TW9vZCkpXHJcbiAgICB9KVxyXG4gICAgfSApKVxyXG5cclxuIl19
