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
  handleNewColumn();
}
function handleNewColumn() {
  getElements();
  start();
  over();
  end();
  currentOverColumnList();
  startColumn();
  overColumn();
  endColumn();
  attachEventHandlerToForm();
}

// sorting
var columns = null;
var lists = null;
var items = null;
var forms = null;
var pickedElement = null;
var overElement = null;
var activeList = null;
var pickedColumn = null;
var parent = null;

// get elements
function getElements() {
  columns = document.querySelectorAll(".column");
  lists = document.querySelectorAll(".list");
  items = document.querySelectorAll(".item");
  forms = document.querySelectorAll(".form");
  parent = document.getElementById("column-list");
}
getElements();

// to find over in which column
function currentOverColumnList() {
  columns.forEach((column) => {
    column.addEventListener("dragover", () => {
      pickedColumn = column;
      activeList = column.querySelector(".list");
    });
  });
}
currentOverColumnList();

// start column
function startColumn() {
  columns.forEach((column) => {
    column.addEventListener("dragstart", () => {
      dragStart(column);
    });
  });
}
startColumn();

// start
function start() {
  items.forEach((item) => {
    item.addEventListener("dragstart", () => {
      dragStart(item);
    });
  });
}
start();

function dragStart(item) {
  pickedElement = item;
  item.classList.add("dragging");
}

// over column
function overColumn() {
  columns.forEach((column) => {
    column.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(e);
        dragOverColumn(e, column);
      },
      true
    );
  });
}
overColumn();

// over
function over() {
  items.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      e.preventDefault();
      dragOver(e, item);
    });
  });
}
over();

// column over
function dragOverColumn(e, item) {
  overElement = item;
  var overElementPos = calculateOverColumnPos(overElement, e.clientY);
  if (overElementPos > e.clientX) {
    parent.insertBefore(pickedElement, overElement);
  } else {
    overElement.insertAdjacentElement("afterend", pickedElement);
  }
}

// item over
function dragOver(e, item) {
  overElement = item;
  var overElementPos = calculateOverElePos(overElement, e.clientY);
  if (overElementPos > e.clientY) {
    activeList.insertBefore(pickedElement, overElement);
  } else {
    overElement.insertAdjacentElement("afterend", pickedElement);
  }
}

// end column
function endColumn() {
  columns.forEach((column) => {
    column.addEventListener("dragend", () => {
      dragEnd(column);
    });
  });
}
endColumn();

// end
function end() {
  items.forEach((item) => {
    item.addEventListener("dragend", () => {
      dragEnd(item);
    });
  });
}
end();

function dragEnd(item) {
  item.classList.remove("dragging");
}
// item calculateOverColumnPos
function calculateOverColumnPos(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.left + elementPositions.width / 2;
}

// item calculateOverElePos
function calculateOverElePos(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.top + elementPositions.height / 2;
}

// form handling
function attachEventHandlerToForm() {
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      handleForm(e, form);
    });
  });
}
attachEventHandlerToForm();

function handleForm(e, form) {
  var inputValue = form.querySelector(".input-field").value;
  var newElement = createEle(inputValue);
  attachEventHandlers(newElement);
  form.previousElementSibling.appendChild(newElement);
}

// attach event handlers to newly created item
function attachEventHandlers(newElement) {
  newElement.addEventListener("dragstart", () => {
    dragStart(newElement);
  });
  newElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragOver(e, newElement);
  });
  newElement.addEventListener("dragend", () => {
    dragEnd(newElement);
  });
}

function createEle(inputValue) {
  var newElement = document.createElement("li");
  newElement.className = "item";
  newElement.setAttribute("draggable", "true");
  var heading = `<h3>${inputValue}</h3>`;
  newElement.innerHTML += heading;
  return newElement;
}
