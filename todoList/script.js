const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelector('#todo-input')
const todoList = document.querySelector('.todo-list')
const theButton = document.querySelector('#theButton')

var listItems = {};


theButton.addEventListener('click', function (e) {
 e.preventDefault();

 if (!validate(todoInput.value)) {
  todoInput.style.borderColor = 'red';
  return;
 }

 todoInput.style.borderColor = 'lightGreen';

 let theItems = manageTodo();

 manageDisplay(theItems);

})

function validate(item) {
 if (item === '') {
  return false;
 }
 return true;
}

function manageTodo() {

 if (localStorage.getItem('todoItem') !== null) {
  listItems = JSON.parse(localStorage.getItem('todoItem'));
  console.log(listItems)
 }

 listItems[Object.keys(listItems).length] = todoInput.value;


 localStorage.setItem('todoItem', JSON.stringify(listItems));

 return listItems;

}

function manageDisplay(items) {

 //loop through the value from db and diplay 
 let text = '';
 console.log(items)
 for (var i in items) {
  text += `<li>${items[i]}</li>`;
 }

 document.querySelector('#todo-list').innerHTML = text;

}