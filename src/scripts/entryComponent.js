// creating div

 let component = {
  build (element) {
    console.log(element);
  return `<div class = "inserted">
    <h1>${element.date}</h1>
    <h3>${element.concept}</h3>
    <h4>${element.mood.mood}</h4>
    <p>${element.entry}</p>
  </div>`;
}
}

export default component