// add column
function addColumn() {
  let output = ` <li class="column active" draggable="true">
    <h2 contenteditable="true" class="column__heading">Things To Do</h2>
    <ul class="list">
    </ul>
    <form class="form">
      <input type="text" name="name" class="input-field" id="input" />
      <button type="submit" class="btn btn-primary form-btn">
        Add
      </button>
    </form>
  </li>`;
  document.getElementById("column-list").innerHTML += output;
  attachEventHandlers();
}

function attachEventHandlers() {
  forms = document.querySelectorAll(".form");
  // form handling
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleForm(e, form);
    });
  });
}

// sorting
var columns = null;
var lists = null;
var items = null;
var forms = null;
var pickedElement = null;
var overElement = null;
var activeList = null;

// get eleemnts
function getElements() {
  columns = document.querySelectorAll(".column");
  lists = document.querySelectorAll(".list");
  items = document.querySelectorAll(".item");
  forms = document.querySelectorAll(".form");
}
getElements();

// over to find column
columns.forEach((column) => {
  column.addEventListener("dragover", () => {
    activeList = column.querySelector(".list");
  });
});

/////////

// start
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    dragStart(item);
  });
});

function dragStart(item) {
  pickedElement = item;
  item.classList.add("dragging");
}

// over
items.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragOver(e, item);
  });
});

function dragOver(e, item) {
  overElement = item;
  var overElementPos = calculateOverElePos(overElement, e.clientY);
  if (overElementPos > e.clientY) {
    activeList.insertBefore(pickedElement, overElement);
  } else {
    overElement.insertAdjacentElement("afterend", pickedElement);
  }
}

// end
items.forEach((item) => {
  item.addEventListener("dragend", () => {
    dragEnd(item);
  });
});

function dragEnd(item) {
  item.classList.remove("dragging");
}

function calculateOverElePos(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.top + elementPositions.height / 2;
}

// form handling
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleForm(e, form);
  });
});

function handleForm(e, form) {
  var inputValue = form.querySelector(".input-field").value;
  var newElement = createEle(inputValue);
  console.log("reached");
  dragStart(newElement);
  dragOver(e, newElement);
  dragEnd(newElement);
  form.previousElementSibling.appendChild(newElement);
}

function createEle(inputValue) {
  var newElement = document.createElement("li");
  newElement.className = "item";
  newElement.setAttribute("draggable", "true");
  var heading = `<h3>${inputValue}</h3>`;
  newElement.innerHTML += heading;
  return newElement;
}
