const todoForm = document.querySelector('.todo-form')
const todoInput = document.querySelelctor('#todo-input')
const todoList = document.querySelelctor('.todo-list')

let listItems = []

let localStorage = localStorage.getItem('todoItem');

todoForm.addEventListener('submit', function (e) {
 e.preventDefault()
 if (validate(todoInput.value)) {
  todoInput.style.borderColor = 'red';
  return;
 }

 todoInput.style.borderColor = 'none';



})

function addTodo(item) {
 if (item === '') {
  return false;
 }
 return true;
}

function manageTodo() {
 if (typeof localStorage === 'undefined') {
  listItems.push(todoInput.value);
 }
}