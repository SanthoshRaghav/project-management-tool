// add column
function addColumn() {
  let output = ` <li class="column"><h3 contenteditable="true"class="column__heading">Things To Do</h3></li>`;
  document.getElementById("column-list").innerHTML += output;
}

// sorting
var list = document.querySelector(".list");
var items = document.querySelectorAll(".item");

var pickedElement = "";

// start
items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    check(item);
  });
});
function check(item) {
  pickedElement = item;
  item.classList.add("dragging");
  // setTimeout(() => item.remove(), 0);
}
// enter
items.forEach((item) => {
  item.addEventListener("dragenter", () => {
    // item.style.marginBottom = "79px";
    console.log("enter");
  });
});

// over
items.forEach((item) => {
  item.addEventListener("dragover", (e) => {
    e.preventDefault();
    test(e, item);
  });
});
function test(e, item) {
  var overElement = calculateOverElementPositions(item, e.clientY);
  if (overElement > e.clientY) {
    list.insertBefore(pickedElement, item);
  } else {
    item.insertAdjacentElement("afterend", pickedElement);
  }
}
// drop
items.forEach((item) => {
  item.addEventListener("drop", (e) => {
    e.preventDefault();
    // item.style.marginBottom = "20px";
  });
});

// leave
items.forEach((item) => {
  item.addEventListener("dragleave", () => {
    console.log("leave");
    // item.style.marginBottom = "20px";
  });
});

// end
items.forEach((item) => {
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

function calculateOverElementPositions(item) {
  var elementPositions = item.getBoundingClientRect();
  return elementPositions.top + elementPositions.height / 2;
}

// form
var forms = document.querySelectorAll(".form");
forms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    var inputFieldValue = form.querySelector(".input-field").value;
    var newElement = document.createElement("li");
    newElement.className = "item";
    newElement.innerText = inputFieldValue;
    newElement.setAttribute("draggable", "true");
    pickedElement = newElement;
    newElement.addEventListener("dragstart", () => {
      check(newElement);
      // setTimeout(() => newElement.remove(), 100);
    });
    newElement.addEventListener("dragover", (e) => {
      e.preventDefault();
      // var overElement = calculateOverElementPositions(e.target, e.clientY);
      test(e, e.target);
      // if (overElement > e.clientY) {
      //   console.log(e.target);
      //   list.insertBefore(newElement, e.target);
      // } else {
      //   e.target.insertAdjacentElement("afterend", e.target);
      // }
    });
    newElement.addEventListener("dragend", () => {
      newElement.classList.remove("dragging");
    });
    form.previousElementSibling.appendChild(newElement);
  });
});
