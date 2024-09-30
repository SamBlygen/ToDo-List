import { useReducer, useState } from "react";
import { InitialState } from "./component/Todos";
import TodoItem from "./component/TodoItem";
import "./App.css"


function todoReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_TODO":
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case "DELETE_TODO":
      return state.filter(todo => todo.id !== action.payload);
    case "EDIT_TODO":
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.text }
          : todo
      );
    case "ADD_TODO":
      return [action.payload, ...state];
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, InitialState);
  const [newTodo, setNewTodo] = useState("");

 
  const toggleComplete = (id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };


  const editTodo = (id, text) => {
    dispatch({ type: "EDIT_TODO", payload: { id, text } });
  };


  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const newTodoItem = {
        userId: 1,
        id: todos.length + 1,
        title: newTodo,
        completed: false,
      };
      dispatch({ type: "ADD_TODO", payload: newTodoItem });
      setNewTodo(""); 
    }
  };

  return (
    <>
      <h2>Sam's Todo List</h2>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New Todo"
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </div>
    </>
  );
}

export default App;