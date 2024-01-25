import TodoItem from "./TodoItem";

const TodoList = ({ todos, remove, update }) => {
  return (
    <div className="list-container">
      <h2>Todos List</h2>
      <div className="list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            remove={remove}
            update={update}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
