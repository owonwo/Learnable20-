const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".todo-list");
const theButton = document.querySelector("#theButton");

var listItems = [];

// retreives and sets the items from storage when the page loads
window.addEventListener("load", () => {
  listItems = getItems();
  manageDisplay(listItems);
});

theButton.addEventListener("click", function (e) {
  e.preventDefault();

  if (!validate(todoInput.value)) {
    todoInput.style.borderColor = "red";
    return;
  }

  todoInput.style.borderColor = "lightGreen";
  addItemToList(todoInput.value, listItems);
  manageDisplay(listItems);
});

function addItemToList(text, list) {
  list.push({ text: text, editing: false, checked: false, deleted: false });
  saveItems(list);
}

function validate(item) {
  if (item === "") {
    return false;
  }
  return true;
}

function getItems() {
  if (localStorage.getItem("todoItem") !== null) {
    return JSON.parse(localStorage.getItem("todoItem"));
  }

  return []; // returns an empty array when no items is in the storage
}

function saveItems(items) {
  localStorage.setItem("todoItem", JSON.stringify(items));
}

function manageDisplay(items) {
  // clear the todoList before re-rendering
  todoList.innerHTML = "";
  //loop through the value from db and diplay
  for (const item of items) {
    if (item.deleted) continue;
    let list = document.createElement("li");
    list.innerHTML = `
        ${
          item.editing
            ? `<input type="text" role="edit" />`
            : `<b> ${item.text}</b>`
        }
        <span>
            <button>CHECK</button>
            <button role="edit">EDIT</button>
            <button role="delete">DELETE</button>
        </span>
    `;

    // adds an event listener to the delete button that calls the
    // removeItem function passing in the item to be deleted
    const deleteButton = list.querySelector("button[role=delete]");
    deleteButton.addEventListener("click", () => {
      removeItem(item, items);
      // saves new items
      saveItems(listItems);
      manageDisplay(listItems);
    });

    list.querySelector("button[role=edit]").addEventListener("click", () => {
      item.editing = !item.editing;
      // saves new items
      saveItems(listItems);
      manageDisplay(listItems);
    });

    todoList.appendChild(list);
  }
}

const removeItem = (item, items) => {
  item.deleted = true;
};
