import { BrowserRouter,Routes,Route, useNavigate, useParams } from 'react-router-dom'

export default function ErrorComponent(){
    const navigate= useNavigate()
    function goToLogin() {
        return (
            navigate('/login')
        )
    }
    return(
        <div className="errorcomponent">
            <h1>Invalid Page</h1>
            <div>Page is still under construction :| </div>
            <div>
                Go to Login Page: 
                <button type="button" onClick={goToLogin}>Login</button>
            </div>
        </div>
    )
}