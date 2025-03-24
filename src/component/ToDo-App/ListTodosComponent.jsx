import { useEffect, useState } from "react";
import { deleteTodoApi, getTodos } from "./API/ToDoApiService";
import { useAuth } from './Security/AuthContext'

import "./css/list.css"
import toast from "react-hot-toast"
import {  useNavigate } from "react-router-dom";

export default function ListTodosComponent(){
    const authContext = useAuth()
    const username = authContext.username
    const today=new Date();
    const targetDate = new Date(today.getFullYear()+12, today.getMonth(), today.getDate());
    const navigate=useNavigate()
    const [todos,setTodos] = useState([])

    function refreshTodos(){
        getTodos(username)
            .then((response) => {
                setTodos(response.data)
                
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Clean up'))
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id).then((response) => {
            console.log(response)
            if (response.status === 204) { 
                toast.success("Todo deleted successfully!", { position: "top-right" });
                refreshTodos();
            }
        })
        .catch(error => console.log(error))
        .finally(() => console.log('clean up'))
    }

    useEffect(() => {
        refreshTodos();
    }, []);

    function updateTodo(id) {
        navigate(`/todos/${id}`);
    }

    function addnewTodo(){
        navigate(`/todos/-1`)
    }

    return (
        <div className="container">
            <h1>Todos List</h1>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Target Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            todos.map(
                                todo => (
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                        <td className="actionbtn">
                                            <button type="button" className="btn btn-warning" onClick={() => updateTodo(todo.id)} > Update </button>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteTodo(todo.id)} > Delete </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        
                    </tbody>
                </table>
                <div className="btn btn-success m-4" onClick={addnewTodo}>Add new ToDo</div>
            </div>
        </div>
    )
}




