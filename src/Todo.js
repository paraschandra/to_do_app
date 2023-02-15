import React from 'react'

const Todo = ({todo, toggleTodo, deleteTodo, editTodo}) => {
    
  const handleTodoClick = () =>{
    toggleTodo(todo.id)
  }

  const handleDelete = () => {
    deleteTodo(todo.id)
  }

  const handleEdit = () => {
    editTodo(todo.id)
  }

  return (
    <div className = 'todo-item'>
          <input className = 'checkbox' type = "checkbox" checked = {todo.complete} onChange = {handleTodoClick}/>
          <div className= {`todo-text ${todo.complete}`}>{todo.name}</div>
          <button onClick={handleEdit} className = 'edit-btn btn'>
            <img src="/images/icon-edit.svg" alt="edit-icon" />
          </button>
          <button onClick={handleDelete} className = 'delete remove-btn btn'>
            <img src="/images/icon-cross.svg" alt="delete-icon" />
          </button>
    </div>
  );
}

export default Todo;