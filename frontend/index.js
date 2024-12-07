const API_URL = "http://127.0.0.1:8000/todos/"

const todoForm = document.getElementsByClassName('todoForm')
const todoTitle = document.getElementsByClassName('todoTitle')
const todoDescription = document.getElementsByClassName('todoDescription')
const todoList = document.getElementsByClassName('todoList')

async function fetchTodos() {
    const response = await fetch(API_URL)
    const todos = await response.json()
    renderTodos(todos)
}

function renderTodos(todos) {
    todoList.innerHTML = ''
    todos.forEach(todo => {
        const li = document.createElement('li')
        li.innerHTML = `
        <div><strong>${todo.title}</strong><p>${todo.description || ''}</p></div><button onclick="deleteToDo(${todo.id})">Delete</button>`
        todoList.appendChild(li)
    })
}

