import React from 'react'

export default function Todo({todo, toggleTodo}) {
    function handleTodoClick() {
        toggleTodo(todo.id)
    }
    return (
        <div>
            <label>
                {/* checked property to check if complete */}
                <input type="checkbox" checked={todo.complete} onChange={handleTodoClick}/>
                {/* print the name */}
                {todo.name}                
            </label>

        </div>
    )
}
