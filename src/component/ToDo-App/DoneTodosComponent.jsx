import { useEffect, useState } from "react";
import { deleteTodoApi, getTodosByStatus } from "./API/ToDoApiService";
import { useAuth } from './Security/AuthContext';
import "./css/list.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DoneTodosComponent() {
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    function refreshTodos() {
        getTodosByStatus(username, true) // only completed todos
        .then(response => setTodos(response.data))
        .catch(error => console.log(error));
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
        .then(response => {
            if (response.status === 204) {
            toast.success("Todo deleted successfully!", { position: "top-right" });
            refreshTodos();
            }
        })
        .catch(error => console.log(error));
    }

    // function updateTodo(id) {
    //     navigate(`/todos/${id}`);
    // }

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <div className="todo-container">
        <div className="todo-grid">
            {todos.map((todo) => (
            <div className={`todo-card ${todo.done ? "done" : ""}`} key={todo.id}>
                <div className="todo-content">
                <div className="todo-row">
                    <h4 className="todo-title">📝 Task</h4>
                    <p className="todo-description">{todo.description}</p>
                </div>

                <div className="todo-row">
                    <h4 className="todo-label">📅 Target Date</h4>
                    <p className="todo-date">{new Date(todo.targetDate).toLocaleDateString()}</p>
                </div>

                <div className="todo-row">
                    <h4 className="todo-label">📌 Status</h4>
                    <p className="status status-done">✅ Completed</p>
                </div>

                <div className="todo-row">
                    <h4 className="todo-label">🏁 Completed On</h4>
                    <p className="todo-date">{new Date(todo.completeDate).toLocaleDateString()}</p>
                </div>
                </div>

                <div className="todo-actions">
                
                <button
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete task"
                    aria-label="Delete task"
                    className="danger"
                >
                    🗑️ Delete
                </button>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}
