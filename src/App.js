import React, {useState, useRef, useEffect} from "react";

import TodoList from './TodoList';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

const App = () => {
    const [Todos, setTodos] = useState([])
    const [toggleEdit, setToggleEdit] = useState(false)
    const [itemId, setItemId] = useState("")
    const [page, setPage] = useState("All")
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(()=>{
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Todos))
    },[Todos])

    const toggleTodo = (id) => {
        const newTodos = [...Todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    const editTodo = (id) => {
        setToggleEdit(true)
        const todo = Todos.find(todo => todo.id === id)
        todoNameRef.current.value = todo.name
        setItemId(id)
    }

    const deleteTodo = (id) => {
        const newTodos = Todos.filter(todo => {
            return todo.id !== id;
        })
        setTodos(newTodos)
    }

    const handleAdd = (e) => {
        const name = todoNameRef.current.value
        console.log(name)
        if (name === '') return
        else if (name && toggleEdit === true){
            setTodos(Todos.map(todo => {
                if(todo.id === itemId){
                    return{...todo, name: name};
                }
                return todo;
            }))
            setItemId(null)
            setToggleEdit(false)
        }
        else{
            setTodos(prevTodos => {
                return [...prevTodos, {id: Date.now(), name: name, complete: false,}]
            })
        }
        todoNameRef.current.value = null
    }

    const displayAll = (e) => {
        setPage("All")
    }

    const displayActive = (e) => {
        setPage("Active")
    }

    const displayComp = (e) => {
        setPage("Comp")
    }

    const handleClear = () =>{
        const newTodos = Todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <div className="container">
            <div className="header">
            </div>

            <div className="main">
                <div className="head-part">
                    <h1>TODO</h1>
                    <div className="theme">
                        <img src="/images/icon-sun.svg" alt="dark-mode" id="theme-changer" />
                    </div>
                </div>
                <form action="#" className="form">
                    <input className = 'checkbox inpchk' type = "checkbox"/>
                    <input ref = {todoNameRef} type="text" placeholder="Create a new todo..."/>
                    <div className="add-new">
                        {toggleEdit 
                        ? <button onClick = {handleAdd} className = 'edit-btn btn'>
                            <img src="/images/icon-edit.svg" alt="edit-icon" />
                            </button> 
                        : <button onClick = {handleAdd} className = 'add-btn btn'>
                            <img src="/images/icon-add.svg" alt="add-icon"></img>
                            </button>}
                    </div>
                </form>

                <div className="list-wrapper">
                    <div className="todo-list">
                        <TodoList todos = {Todos} 
                        toggleTodo = {toggleTodo} 
                        editTodo = {editTodo}
                        deleteTodo = {deleteTodo}
                        page = {page}/>
                    </div>
                </div>

                <div className="actions">
                    <div className="items-left">
                        <span>{Todos.filter(todo => !todo.complete).length} items left</span>
                    </div>

                    <div className="nav">
                        <div>
                            <p onClick={displayAll} className = {`all-nav ${page}`}>All</p>
                            <p onClick={displayActive} className = {`ac-nav ${page}`}>Active</p>
                            <p onClick={displayComp} className = {`comp-nav ${page}`}>Completed</p>
                        </div>
                    </div>
                    <div onClick = {handleClear}>
                        <p>Clear Completed</p>
                    </div>
                </div>

                <div className="attribution">
                    Design inspiration: <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a> |
                    Coded by: <a href="https://github.com/paraschandra">Paras Chandra</a>
                </div>
            </div>
        </div>
    );
}

export default App;