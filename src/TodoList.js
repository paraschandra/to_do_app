import React from "react";
import Todo from "./Todo";

const TodoList = ({todos, toggleTodo, deleteTodo, editTodo, page}) => {
    if(page === "All"){
        return(
            todos.sort((a, b) => b.id - a.id).map((data) => {
                return <Todo 
                key = {data.id}
                toggleTodo = {toggleTodo} 
                deleteTodo = {deleteTodo} 
                editTodo = {editTodo}
                todo ={data}/>
            })
        )
    }

    if(page === "Active"){
        return(
            todos.sort((a, b) => b.id - a.id).filter(data => !data.complete).map((data) => {
                return <Todo 
                key = {data.id}
                toggleTodo = {toggleTodo} 
                deleteTodo = {deleteTodo} 
                editTodo = {editTodo}
                todo ={data}/>
            })
        )
    }

    if(page === "Comp"){
        return(
            todos.sort((a, b) => b.id - a.id).filter(data => data.complete).map((data) => {
                return <Todo 
                key = {data.id}
                toggleTodo = {toggleTodo} 
                deleteTodo = {deleteTodo} 
                editTodo = {editTodo}
                todo ={data}/>
            })
        )
    }
}

export default TodoList;