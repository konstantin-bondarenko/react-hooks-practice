import React, { useState, useEffect, useReducer } from 'react';

import TodoList from './components/TodoList';
import {Context} from './hooks/context';
import reducer from './hooks/reducer';

export default function App() {
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos') || JSON.stringify([])))
  const [todoTitle, setTodoTitle] = useState('')

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(state))
  },[state])

  const addTodo = (event) => {
    if(event.key === 'Enter'){
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('')
    }
  }

  return (
    <Context.Provider value={{
      dispatch
    }}>
      <div className="container">
        <h1>Todo app</h1>
          <div className="input-field">
            <input 
            type="text" 
            value={todoTitle}
            onChange={(e)=>setTodoTitle(e.target.value)}
            onKeyPress={addTodo} />
            <label>Todo name</label>
          </div>
          <TodoList todos={state} />
      </div>
    </Context.Provider>
  );

}