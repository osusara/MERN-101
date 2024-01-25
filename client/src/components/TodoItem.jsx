import { useState } from "react";

const TodoItem = ({ todo, remove, update }) => {
  const [edit, setEdit] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState(todo.text);

  return (
    <li className="li">
      <button className="btn btn-remove" onClick={() => remove(todo.id)}>
        <b>X</b>
      </button>
      {edit ? (
        <>
          <input
            className="input-update"
            placeholder="Update todo"
            value={updatedTodo}
            onChange={(e) => setUpdatedTodo(e.target.value)}
          />
          <button
            className="btn"
            onClick={() => {
              update(todo.id, updatedTodo);
              setEdit(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <span className="todo-text" onClick={() => setEdit(true)}>
          {todo.text}
        </span>
      )}
    </li>
  );
};

export default TodoItem;
