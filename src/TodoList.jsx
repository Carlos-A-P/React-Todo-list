import React from 'react'
import Todo from './Todo'

export default function TodoList({todos, toggleTodo}) {
    return (
        // map over all of our todos, so for each one of our todos, we want to 
        // return a todo element or todo component. We want it to pass our todo
        todos.map(todo => {
            //set key to todo name so that each has a unique key
            //go back to what todo prop does===========
            // unique key with id
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo}/>
        })
    )
}


