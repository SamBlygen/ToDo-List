import { useState } from "react"


export default function TodoItem({ todo, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.title);

  const handleSave = () => {
    editTodo(todo.id, editedText);
    setIsEditing(false);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
      />

      {isEditing ? (
        <input
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
        />
      ) : (
        <span className={`todo-title ${todo.completed ? "completed" : ""}`}>
          {todo.title}
        </span>
      )}

      {!isEditing ? (
        <>
          <button
            className="btn-delete"
            disabled={!todo.completed}
            onClick={() => deleteTodo(todo.id)}
          >
            Delete
          </button>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </>
      ) : (
        <button className="btn-save" onClick={handleSave}>
          Save
        </button>
      )}
    </div>
  );
}