import { useEffect, useState } from "react";
import { deleteTodoApi, getTodosByStatus, markTodoCompletedApi } from "./API/ToDoApiService";
import { useAuth } from './Security/AuthContext';
import "./css/list.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ListPendingTodosComponent() {
    const authContext = useAuth();
    const username = authContext.username;
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);

    function refreshTodos() {
        getTodosByStatus(username, false) // only pending todos
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

    function markCompleteTodo(id) {
        markTodoCompletedApi(username, id)
        .then(response => {
            if (response.status === 200) {
            toast.success("Todo marked as completed!", { position: "top-right" });
            refreshTodos();
            }
        })
        .catch(error => console.log(error));
    }

    function updateTodo(id) {
        navigate(`/todos/${id}`);
    }

    function addNewTodo() {
        navigate(`/todos/-1`);
    }

    useEffect(() => {
        refreshTodos();
    }, []);

    return (
        <div className="todo-container">
            <div className="add-button">
                <button onClick={addNewTodo} aria-label="Add new todo">
                    ➕ Add New Todo
                </button>
            </div>
            
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
                    <p
                    className={`status ${
                        todo.done
                        ? "status-done"
                        : new Date(todo.targetDate) < new Date()
                        ? "status-overdue"
                        : "status-pending"
                    }`}
                    >
                    {todo.done
                        ? "✅ Completed"
                        : new Date(todo.targetDate) < new Date()
                        ? "⚠️ Overdue"
                        : "⏳ Pending"}
                    </p>
                </div>
                </div>

                <div className="todo-actions">
                <button onClick={() => updateTodo(todo.id)} title="Edit task" aria-label="Edit task">
                    ✏️ Edit
                </button>
                {!todo.done && (
                    <button
                    onClick={() => markCompleteTodo(todo.id)}
                    title="Mark as completed"
                    aria-label="Mark as completed"
                    >
                    ✅ Complete
                    </button>
                )}
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
