import axios from "axios";

export const apiClient = axios.create({
    //baseURL: 'http://localhost:5000'
    baseURL: 'https://todo-backend-1nly.onrender.com/'
})