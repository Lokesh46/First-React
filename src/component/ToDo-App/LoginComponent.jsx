import { useState } from 'react'
import { BrowserRouter,Routes,Route, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './Security/AuthContext'


export default function LoginComponent(){

    const [username, setUsername] =useState('test')
    const authContext = useAuth()
    function handleUsenameChange(event) {
        setUsername(event.target.value)
    }


    const [password, setPassword] = useState('')

    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate= useNavigate()
    async function handleSubmit(){

        if(await authContext.login(username,password)){
            navigate(`/welcome/${username}`)
        }
        else{
            setShowErrorMessage(true)
        }            
    }

    return (
        <div className="login">
            <div className="loginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" value={username} onChange={handleUsenameChange}></input>
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange}></input>
                </div>

                <div>
                    <button type="button" className="btn btn-success m-3" onClick={handleSubmit}>Login</button>
                </div>
                {showErrorMessage && <div className="errormessage"> Login Failed</div>}
            </div>
        </div>
    )
}
