import { apiClient } from "../API/ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    headers: {
        Authorization: token
    }
})


export const executeJwtAuthenticationService = async (username, password) => apiClient.post(`/authenticate`,{username, password})