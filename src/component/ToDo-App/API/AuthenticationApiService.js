import { apiClient } from "../API/ApiClient";

export const executeBasicAuthenticationService = (token) => apiClient.get(`/basicauth`,{
    headers: {
        Authorization: token
    }
})


export const executeJwtAuthenticationService = async (username, password) => apiClient.post(`/authenticate`,{username, password})

export const register = async (username, password) => {
  try {
    const response = await apiClient.post('/register', { username, password });
    return response.status === 200;  // success
  } catch (error) {
    if (error.response && error.response.status === 409) {
      // User exists
      return false;
    }
    // Other errors
    throw error; // or return false if you want
  }
}
