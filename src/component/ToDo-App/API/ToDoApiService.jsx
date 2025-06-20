import { apiClient } from './ApiClient'


export const getTodos = (username) => apiClient.get(`/users/${username}/todos`)
export const deleteTodoApi = (username,id) => apiClient.delete(`/users/${username}/todos/${id}`)
export const getTodoApi = (username,id) => apiClient.get(`/users/${username}/todos/${id}`)
export const getTodosByStatus = (username, done) => apiClient.get(`/users/${username}/todos?done=${done}`)
export const updateTodoApi = (username,id,todo) => apiClient.put(`/users/${username}/todos/${id}`, todo)
export const createTodoApi = (username,todo) => apiClient.post(`/users/${username}/todos`, todo)
export const markTodoCompletedApi = (username,id) => apiClient.put(`/users/${username}/todos/update/${id}`)