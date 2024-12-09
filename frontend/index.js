const API_URL = "http://127.0.0.1:8000/todos/";

const todoForm = document.querySelector(".todoForm");
const todoTitle = document.querySelector(".todoTitle");
const todoDescription = document.querySelector(".todoDescription");
const todoList = document.querySelector(".todoList");

async function fetchTodos() {
  const response = await fetch(API_URL);
  const todos = await response.json();
  renderTodos(todos);
}

function renderTodos(todos) {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <div><strong>${todo.title}</strong><p>${
      todo.description || ""
    }</p></div><button onclick="deleteToDo(${todo.id})">Delete</button>`;
    todoList.appendChild(li);
  });
}

todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const todo = {
    id: Date.now(),
    title: todoTitle.value(),
    description: todoDescription.value(),
    completed: false,
  };
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });

  if (response.ok) {
    fetchTodos();
    todoForm.reset();
  } else {
    alert("Failed to add Task");
  }
});

async function deleteTask(id) {
  const response = await fetch(`${API_URL}${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    fetchTodos();
  } else {
    alert("Failed to delete Task");
  }
}

fetchTodo();
