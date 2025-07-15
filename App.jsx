import { useState, useEffect } from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [IdForEditing, setIdForEditing] = useState(null);
  const [TextForEditing, setTextForEditing] = useState("");
  // adding a todo 
  const addTodo = () => {
    if (input.trim() == "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
    };

    setTodos((prev) => [newTodo, ...prev]);
    setInput("");
  };

  useEffect(() => {
    const saveTodos = JSON.parse(localStorage.getItem("todos"));
    if (saveTodos && saveTodos.length > 0) {
      setTodos(saveTodos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  //Editing todo
  const editingTodo = (id, text) => {
    setIdForEditing(id);
    setTextForEditing(text);
  };
  const saveEditedTodo = (id) => {
    const updatedTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, text: TextForEditing } : todos
    );
    setTodos(updatedTodo);
    setIdForEditing(null);
    setTextForEditing("");
  };
  // deleting todo
  const deleteTodo = (id) => {
    const GetTodo = JSON.parse(localStorage.getItem("todos"));
    const Deleted = GetTodo.filter((todo) => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(Deleted));
    setTodos(Deleted);
  };
  return (
    <>
      <h1 className="mt-0 ml-60">TODO project</h1>
      <input
        className={" w-full bg-pink-600 mt-5 p-3 ml-15 "}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="write your todo..."
      />
      <button className={`px-4 py-2 rounded-lg ml-50 mt-5`} onClick={addTodo}>
        ADD
      </button>

      <ul className="mt-10 ml-15">
        {todos.map((todo) => (
          <li
            className="mt-10 bg-amber-200 text-black p-2 flex-1/3 "
            key={todo.id}
          >
            {IdForEditing === todo.id ? (
              <>
                <input
                  value={TextForEditing}
                  onChange={(e) => setTextForEditing(e.target.value)}
                  className="p-1 border rounded"
                />
                <button
                  onClick={() => saveEditedTodo(todo.id)}
                  className="ml-2 bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button
                  onClick={() => editingTodo(todo.id, todo.text)}
                  className="ml-2 bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
