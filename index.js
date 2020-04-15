var columns = null; // all columns
var lists = null; // all lists
var items = null; // all items
var forms = null; // all forms
var pickedItem = null; // dragging element
var overedItem = null; // element got overed by dragging element
var pickedColumn = null; // dragging column
var overedColumn = null; // column got overed by dragging column

// get elements
function getElements() {
  columns = document.querySelectorAll(".column");
  lists = document.querySelectorAll(".list");
  items = document.querySelectorAll(".item");
  forms = document.querySelectorAll(".form");
  deletes = document.querySelectorAll(".item__delete");
}

/**
 *
 * start ITEM
 *
 */

// startItem function
function startItem(items) {
  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      dragStartItem(item);
    });
  });
}

// dragStartItem
function dragStartItem(item) {
  pickedItem = item;
  item.classList.add("dragging-item");
}

/**
 *
 * over ITEM
 *
 */

// overItem function
function overItem(items) {
  items.forEach((item) => {
    item.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (pickedItem) {
        dragOverItem(e, item);
      }
    });
  });
}

// dragOverItem function
function dragOverItem(e, item) {
  overedItem = item;
  var overedItemPosition = calculateOverItemPosition(overedItem);
  var overedItemParent = overItemResidence(overedItem);
  if (overedItemPosition > e.clientY) {
    overedItemParent.insertBefore(pickedItem, overedItem);
  } else {
    overedItem.insertAdjacentElement("afterend", pickedItem);
  }
}

// overed item conatined in which parent div or element
function overItemResidence(overedItem) {
  return overedItem.parentElement;
}

// calculate overed item position
function calculateOverItemPosition(overedItem) {
  var elementPositions = overedItem.getBoundingClientRect();
  return elementPositions.top + elementPositions.height / 2;
}

/**
 *
 * end ITEM
 *
 */

function endItem(items) {
  items.forEach((item) => {
    item.addEventListener("dragend", (e) => {
      e.stopPropagation();
      dragEndItem(item);
    });
  });
}

// dragEnd
function dragEndItem(item) {
  item.classList.remove("dragging-item");
  pickedItem = null;
  overedItem = null;
}

/**
 *
 * start COLUMN
 *
 */

// startColumn function
function startColumn(columns) {
  columns.forEach((column) => {
    column.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      dragStartColumn(column);
    });
  });
}

// dragStartColumn
function dragStartColumn(column) {
  pickedColumn = column;
  column.classList.add("dragging-column");
}

/**
 *
 * over COLUMN
 *
 */

// overColumn function
function overColumn(columns) {
  columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (pickedColumn) {
        dragOverColumn(e, column);
      }
    });
  });
}

// dragOverColumn function
function dragOverColumn(e, column) {
  overedColumn = column;
  var overedColumnPosition = calculateOverColumnPosition(overedColumn);
  var overedColumnParent = overColumnResidence(overedColumn);
  if (overedColumnPosition > e.clientX) {
    overedColumnParent.insertBefore(pickedColumn, overedColumn);
  } else {
    overedColumn.insertAdjacentElement("afterend", pickedColumn);
  }
}

// overed column conatined in which parent div or element
function overColumnResidence(overedColumn) {
  return overedColumn.parentElement;
}

// calculate overed column position
function calculateOverColumnPosition(overedColumn) {
  var elementPositions = overedColumn.getBoundingClientRect();
  return elementPositions.left + elementPositions.width / 2;
}

/**
 *
 * end COLUMN
 *
 */

function endColumn(columns) {
  columns.forEach((column) => {
    column.addEventListener("dragend", (e) => {
      e.stopPropagation();
      dragEndColumn(column);
    });
  });
}

// dragEnd
function dragEndColumn(column) {
  column.classList.remove("dragging-column");
  pickedColumn = null;
  overedColumn = null;
}

/**
 *
 * delete ITEM
 *
 */

function deleteItem() {
  deletes.forEach((erase) => {
    erase.addEventListener("click", (e) => {
      e.stopPropagation();
      e.target.parentElement.remove();
    });
  });
}

/**
 *
 * Initial Flow
 *
 */

// main function
function main() {
  getElements();
  startItem(items);
  overItem(items);
  endItem(items);
  startColumn(columns);
  overColumn(columns);
  endColumn(columns);
  deleteItem();
  addEvtListenersToForm();
}
main();

/**
 *
 * Add Column
 *
 */

// add column
function addColumn() {
  let output = ` <li class="column active" draggable="true">
    <h2 contenteditable="true" class="column__heading">Development</h2>
    <ul class="list">
    <li class="item" draggable="true">
      <h3 class="item__heading">Released</h3>
      <div contenteditable="true" class="item__description">
        Thanks guys! for giving this nice task
      </div>
      <span class="item__delete">X</span>
    </li>
    </ul>
    <form class="form">
      <input type="text" name="name" class="input-field" id="input" />
      <button type="submit" class="btn btn-primary form-btn">
        Add
      </button>
    </form>
  </li>`;
  document.getElementById("column-list").innerHTML += output;
  main();
}

/**
 *
 * Form
 *
 */

// addEvtListenersToForm function
function addEvtListenersToForm() {
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation();
      handleForm(form);
    });
  });
}

// handleForm function
function handleForm(form) {
  var inputVal = form.querySelector(".input-field").value;
  if (!(inputVal === "")) {
    var newItem = createEle(inputVal);
    form.previousElementSibling.innerHTML += newItem;
    quickUpdate();
  }
}

// quickUpdate function
function quickUpdate() {
  items = document.querySelectorAll(".item");
  deletes = document.querySelectorAll(".item__delete");
  startItem(items);
  overItem(items);
  endItem(items);
  deleteItem();
}

// createEle function
function createEle(inputVal) {
  return ` <li class="item" draggable="true"><h3 class="item__heading">${inputVal}</h3><div contenteditable="true" class="item__description">Thanks guys! for giving this nice task</div><span class="item__delete">X</span></li>`;
}
