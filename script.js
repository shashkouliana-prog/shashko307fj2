const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

// Єдине джерело правди: масив завдань
let todos = []
let nextId = 1

// Створює DOM-елемент для одного завдання
function createTodoElement(todo) {
  const li = document.createElement('li')
  li.className = classNames.TODO_ITEM

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.className = classNames.TODO_CHECKBOX
  checkbox.checked = todo.checked
  checkbox.addEventListener('change', () => toggleTodo(todo.id))

  const text = document.createElement('span')
  text.className = classNames.TODO_TEXT
  text.textContent = todo.text
  if (todo.checked) text.style.textDecoration = 'line-through'

  const deleteButton = document.createElement('button')
  deleteButton.className = classNames.TODO_DELETE
  deleteButton.textContent = 'Delete'
  deleteButton.addEventListener('click', () => deleteTodo(todo.id))

  li.append(checkbox, text, deleteButton)
  return li
}

// Перемальовує список і оновлює лічильники
function render() {
  list.innerHTML = ''
  todos.forEach(todo => list.appendChild(createTodoElement(todo)))

  itemCountSpan.textContent = todos.length
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length
}

function newTodo() {
  const input = prompt('Enter a new TODO:')
  if (input === null) return // натиснуто "Скасувати"

  const text = input.trim()
  if (!text) return // порожній текст не додаємо

  todos.push({ id: nextId++, text, checked: false })
  render()
}

function toggleTodo(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, checked: !todo.checked } : todo
  )
  render()
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  render()
}
