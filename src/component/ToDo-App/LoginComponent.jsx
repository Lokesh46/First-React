import { useState } from 'react'
import { BrowserRouter,Routes,Route, useNavigate, useParams, Link } from 'react-router-dom'
import { useAuth } from './Security/AuthContext'
import "./css/login.css"
export default function LoginComponent(){

    const [username, setUsername] =useState('')
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
            navigate(`list-todos`)
        }
        else{
            setShowErrorMessage(true)
        }            
    }

    return (
                <div
  className="d-flex justify-content-center align-items-center vh-100">
  <div
    className="card shadow-lg p-4"
    style={{
      width: "100%",
      maxWidth: "400px",
      borderRadius: "16px",
      backgroundColor: "#ffffff",
    }}
  >
    <h2 className="text-center mb-4 text-primary">Login</h2>

    <form>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="usernameInput"
          placeholder="Username"
          value={username}
          onChange={handleUsenameChange}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      {showErrorMessage && (
        <div className="alert alert-danger py-2 text-center">Login Failed</div>
      )}

      <button
        type="button"
        className="btn btn-primary w-100 mb-3"
        onClick={handleSubmit}
        style={{ borderRadius: "8px" }}
      >
        Login
      </button>

      <div className="text-center">
        <span className="text-muted">Don't have an account? </span>
        <Link href="/register" className="fw-semibold text-decoration-none text-primary">
          Register
        </Link>
      </div>
    </form>
  </div>
</div>


    )
}
