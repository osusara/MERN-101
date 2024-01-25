import { useEffect, useState } from 'react'
import "./App.css";

// components
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    get()
  }, [])

  // get all todos
  const get = async () => {
    try {
      const response = await fetch("http://localhost:5000/todo")
      const data = await response.json();

      const todos = data.map(todo => ({ id: todo._id, text: todo.text }))
      setTodos(todos)
    } catch (error) {
      console.log(error)
    }
  }

  // create todo
  const add = async (text) => {
    try {
      if (text) {
        const response = await fetch("http://localhost:5000/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todo: { text }
          })
        });

        const data = await response.json();
        const todo = { id: data._id, text: data.text }

        const list = [...todos];

        list.unshift(todo);
        setTodos(list);
      } else {
        throw new Error("Todo cannot be empty")
      }
    } catch (error) {
      console.log(error)
    }
  };

  // delete todo
  const remove = async (removeId) => {
    try {
      const response = await fetch(`http://localhost:5000/todo/${removeId}`, {
        method: "DELETE"
      })

      const data = await response.json()
      console.log(data.message)

      const updatedList = todos.filter((todo) => todo.id !== removeId);
      setTodos(updatedList);

    } catch (error) {
      console.log(error)
    }
  };

  // update todo
  const update = async (updateId, updatedText) => {
    try {
      if (updatedText) {
        const response = await fetch(`http://localhost:5000/todo/${updateId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            todo: { text: updatedText }
          })
        })

        const data = await response.json()
        console.log(data.message)

        const list = [...todos];

        list.forEach(todo => {
          if (todo.id === updateId)
            todo.text = updatedText
        })

        setTodos(list);
      } else {
        throw new Error("Todo cannot be empty")
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="app">
      <h1 className="title">Todo App</h1>
      <AddTodo add={add} />
      <TodoList todos={todos} remove={remove} update={update} />
    </div>
  );
};

export default App;
