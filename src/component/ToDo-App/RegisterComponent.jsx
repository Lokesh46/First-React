import { useState } from 'react'
import { BrowserRouter,Routes,Route, useNavigate, useParams, Link } from 'react-router-dom'
import { useAuth } from './Security/AuthContext'

import { register } from './API/AuthenticationApiService'
import "./css/login.css"

export default function RegisterComponent() {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const authContext = useAuth()
    const [ErrorMessage,setErrorMessage] = useState("")

    const navigate= useNavigate()
    async function handleSubmit() {
    if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
        setShowErrorMessage(true);
    } else {
        const success = await register(username, password);
        if (success) {
            navigate(`/`);
        } else {
            setErrorMessage("User already exists");
            setShowErrorMessage(true);
        }
    }
}


    function handleUsenameChange(event){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event){
        setPassword(event.target.value);
    }

    function handleConfirmPasswordChange(event){
        setConfirmPassword(event.target.value);
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div
                className="card shadow-lg p-4"
                style={{
                width: "100%",
                maxWidth: "400px",
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                }}
            >

                <h2 className="text-center mb-4 text-primary">Register</h2>

                <div className="mb-3">
                    <input
                    type="text"
                    className="form-control"
                    id="usernameInput"
                    placeholder="Enter Username"
                    value={username}
                    onChange={handleUsenameChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="password"
                    className="form-control"
                    id="passwordInput"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                    />
                </div>

                <div className="mb-3">
                    <input
                    type="password"
                    className="form-control"
                    id="confirmPasswordInput"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    />
                </div>

                {showErrorMessage && (
                    <div className="alert alert-danger py-2 text-center">{ErrorMessage}</div>
                )}

                <button
                    type="button"
                    className="btn btn-primary w-100 mb-3"
                    onClick={handleSubmit}
                    style={{ borderRadius: "8px" }}
                >
                    Register
                </button>

                <div className="text-center">
        <span className="text-muted">Already have an account? </span>
        <Link to="/" className="fw-semibold text-decoration-none text-primary">
          Login
        </Link>
      </div>
            </div>

            
        </div>
    )

}