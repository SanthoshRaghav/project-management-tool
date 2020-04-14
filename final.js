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
getElements();

/**
 * start
 */
function start(elements, classname) {
  elements.forEach((element) => {
    element.addEventListener("dragstart", (e) => {
      e.stopPropagation();
      dragStart(element, classname);
    });
  });
}

// dragStart
function dragStart(item, classname) {
  if (classname === "dragging-item") {
    pickedItem = item;
  } else {
    // pickedColumn = item;
  }
  console.log(pickedColumn);
  item.classList.add(classname);
}

/**
 * over item
 */

function overItem(elements) {
  elements.forEach((element) => {
    element.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dragOverItem(e, element);
    });
  });
}

// dragoveritem
function dragOverItem(e, element) {
  overedItem = element;
  var overedItemPos = calculateOverItemPos(overedItem);
  var overedItemParent = overItemResidence(overedItem);
  if (overedItemPos > e.clientY) {
    overedItemParent.insertBefore(pickedItem, overedItem);
  } else {
    overedItem.insertAdjacentElement("afterend", pickedItem);
  }
}

// overed element conatined in which div or element
function overItemResidence(overedItem) {
  return overedItem.parentElement;
}

// calculate over element position
function calculateOverItemPos(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.top + elementPositions.height / 2;
}
/**
 * over column
 */
function overColumn(elements) {
  elements.forEach((element) => {
    element.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      debugger;
      console.log("called drag over");
      dragOverColumn(e, element);
    });
  });
}

// dragovercolumn
function dragOverColumn(e, element) {
  debugger;
  overedColumn = element;
  var overedColumnPos = calculateOverColumnPos(overedColumn);
  var overedColumnParent = overColumnResidence(overedColumn);
  debugger;
  console.log(pickedColumn, "*******");
  if (overedColumnPos > e.clientY) {
    overedColumnParent.insertBefore(pickedColumn, overedColumn);
  } else {
    overedColumn.insertAdjacentElement("afterend", pickedColumn);
  }
}

// overed column conatined in which div or element
function overColumnResidence(overedColumn) {
  return overedColumn.parentElement;
}

// calculate over column position
function calculateOverColumnPos(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.left + elementPositions.width / 2;
}

/**
 * end
 */
function end(elements, classname) {
  elements.forEach((element) => {
    element.addEventListener("dragend", (e) => {
      e.stopPropagation();
      dragEnd(element, classname);
    });
  });
}

// dragEnd
function dragEnd(item, classname) {
  item.classList.remove(classname);
}

/**
 * initial flow
 */
start(items, "dragging-item");
start(columns, "dragging-column");
overItem(items);
overColumn(columns);
end(items, "dragging-item");
end(columns, "dragging-column");
