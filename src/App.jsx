// Store all of our todo's inside of a state to render those todos and rerender entire tree for us
// In order to use state in a function component, we need to use what's called the use
// state hook. We can import this from react inside these curly braces

// we need to get names of lists so we use the useRef hook which allows us to reference elements inside our html, in our case the input
import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
// importing unique id
const { uuid } = require('uuidv4');
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  //ES6 destructuring array
  //First element is all of our todos and 
  //the second element is going to be a function that updates our todos
  const [todos, setTodos] = useState([])
  // { id:1, name: 'Todo1', complete: true }
  const todoNameRef = useRef()

  //storing todos
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  //setting todos
  //everytime our ray of todo changes, save them in array
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //toggle checkmark
  function toggleTodo(id) {
    //copy of todo list... never modify state variable
    const newTodos = [...todos]
    //get todo that we are tryin to modify
    const todo = newTodos.find(todo => todo.id === id)
    //equal oppisite of todo.complete
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    //value of our input
    const name = todoNameRef.current.value
    if(name === '') return
    //use previous values todos to set new todos to previous
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuid(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    // wrap this inside of an empty element (fragment) 
    <>
    {/* list props are like attributes passed on */}
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text" />
    {/* onclick event listener that activates handleAddTodo function */}
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed Todos</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div> 
    </>
  )
}

export default App
