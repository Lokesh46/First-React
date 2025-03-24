import { apiClient } from './ApiClient'

export const returnHelloWorldBean = () => apiClient.get('/hello-world-bean')
export const returnHelloWorld = () => apiClient.get('/hello-world')
export const returnHelloWorldPathVariable = (username) => apiClient.get(`/hello-world/path-variable/${username}`)


