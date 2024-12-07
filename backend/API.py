from fastapi import FastAPI, HTTPException
from models import ToDo
from database import tasks_db

app = FastAPI()

@app.post("/todos/", response_model=ToDo)
def add_tasks(todo: ToDo):
    if todo.id in tasks_db:
        raise HTTPException(status_code=400, detail='Task is already exist')
    tasks_db[todo.id] = todo
    return todo

@app.get("/todos/{todo.id}", response_model=ToDo)
def read_tasks(todo_id: int):
    todo = tasks_db.get(todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail='Task not found')
    return todo

@app.put("/todos/{todo.id}", response_model=ToDo)
def update_tasks(todo_id: int, updated_todo: ToDo):
    if todo_id not in tasks_db:
        raise HTTPException(status_code=404, detail='Task not found')
    tasks_db[todo_id] = updated_todo
    return updated_todo

@app.delete("/todos/{todo.id}", response_model=ToDo)
def delete_tasks(todo_id: int):
    if todo_id not in tasks_db:
        raise HTTPException(status_code=404, detail='Tasks not found')
    del tasks_db[todo_id]
    return  {"message": "Task deleted successfully"}

@app.get("/todos/", response_model=list[ToDo])
def list_tasks():
    return list(tasks_db.values())