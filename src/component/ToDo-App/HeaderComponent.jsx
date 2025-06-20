import { Link } from 'react-router-dom'
import { useAuth } from './Security/AuthContext'

export default function HeaderComponent() {
    const authContext = useAuth()
    const isAuthenticated = authContext.isAuthenticated
    const username = authContext.username

    function logout() {
        authContext.logout()
    }

    return (
        <header
  className="p-3"
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    background: 'transparent',
    boxShadow: 'none',
    backdropFilter: 'blur(10px)' // Optional: Adds a subtle glass effect
  }}
>

            <div className="container">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-3 align-items-center">
                        {isAuthenticated && (
                            <>
                                <Link className="nav-link fs-5 text-dark" to="/list-todos">Home</Link>
                                <Link className="nav-link fs-5 text-dark" to="/todos/done">Completed Todos</Link>
                            </>
                        )}
                    </div>

                    <div className="d-flex gap-3 align-items-center">
                        {!isAuthenticated && (
                            <Link className="nav-link fs-5 text-dark" to="/login">Login</Link>
                        )}
                        {isAuthenticated && username && (
                            <span className="nav-link fs-5 text-dark">Hi, {username}</span>
                        )}
                        {isAuthenticated && (
                            <Link className="nav-link fs-5 text-dark" onClick={logout} to="/logout">Logout</Link>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
