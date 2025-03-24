import { createContext, useContext, useState } from "react";
//import { returnHelloWorldPathVariable } from "../API/HelloWorldApiService";
import { executeBasicAuthenticationService, executeJwtAuthenticationService } from "../API/AuthenticationApiService"
import { apiClient } from "../API/ApiClient";

export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)


export default function AuthProvider({children}) {

    const [isAuthenticated,setAuthenticated]=useState(false)
    const [username, setUsername] = useState(null)
    const [token, setToken] = useState(null)

    // function login(username,password) {
    //     if(username==='test' && password==='test'){
    //         setAuthenticated(true)
    //         setUsername(username)
    //         return true;
    //     }
    //     else {
    //         setAuthenticated(false)
    //         setUsername(null)
    //         return false;
    //     }
    // }

    // async function login(username,password) {

    //     const baToken = 'Basic ' + window.btoa( username + ":" + password )
        
        
    //     try{
    //         const response = await executeBasicAuthenticationService(baToken)
    //         if(response.status == 200){
    //             setAuthenticated(true)
    //             setUsername(username)
    //             setToken(baToken)

    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     console.log('intercepting and adding a token')
    //                     config.headers.authorization=baToken
    //                     return config
    //                 }
    //             )
    //             return true;
    //         }
    //         else {
    //             logout()
    //             return false;
    //         }
    //     } catch (error) {
    //         logout()
    //         return false;
    //     }
    // }







    async function login(username,password) {

        
        
        try{
            const response = await executeJwtAuthenticationService(username, password)
            console.log("Response from backend:", response);
            const jwtToken = 'Bearer ' + response.data.token
            if(response.status == 200){
                setAuthenticated(true)
                setUsername(username)
                setToken(jwtToken)

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log(jwtToken)
                        config.headers.authorization=jwtToken
                        return config
                    }
                )
                return true;
            }
            else {
                logout()
                return false;
            }
        } catch (error) {
            logout()
            return false;
        }
    }






    function logout(){
        setAuthenticated(false)
        setUsername(null)
        setToken(null)
    }
    return (
        <AuthContext.Provider value = {{username,isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}