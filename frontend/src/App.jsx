import { useEffect, useState } from "react";
import API from "./api";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTodos = async () => {
    const res = await API.get("/todos");
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;
    await API.post("/todos", { title });
    setTitle("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await API.delete(`/todos/${id}`);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <div className="card">
        <h2>🚀 MERN Todo</h2>
        <p className="subtitle">Simple • Fast • Cloud Ready</p>

        <div className="input-group">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter new task..."
          />
          <button onClick={addTodo}>Add</button>
        </div>

        <ul className="list">
          {todos.map((t) => (
            <li key={t._id}>
              <span>{t.title}</span>
              <button className="delete" onClick={() => deleteTodo(t._id)}>
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
