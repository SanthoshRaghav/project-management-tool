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
}

// getElements();

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
      console.log("start item");
      dragStartItem(item);
    });
  });
}

// dragStartItem
function dragStartItem(item) {
  pickedItem = item;
  item.classList.add("dragging-item");
}

// startItem(items);

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
        console.log("over item");
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

// overItem(items);

/**
 *
 * end ITEM
 *
 */

function endItem(items) {
  items.forEach((item) => {
    item.addEventListener("dragend", (e) => {
      e.stopPropagation();
      console.log("end item");
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

// endItem(items);

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
      console.log("start column");
      dragStartColumn(column);
    });
  });
}

// dragStartColumn
function dragStartColumn(column) {
  pickedColumn = column;
  column.classList.add("dragging-column");
}

// startColumn(columns);

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
        console.log("**************");
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

// overColumn(columns);

/**
 *
 * end COLUMN
 *
 */

function endColumn(columns) {
  columns.forEach((column) => {
    column.addEventListener("dragend", (e) => {
      e.stopPropagation();
      console.log("end column");
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

// endColumn(columns);

/**
 *
 * Initial Flow
 *
 */
getElements();
startItem(items);
overItem(items);
endItem(items);
startColumn(columns);
overColumn(columns);
endColumn(columns);
