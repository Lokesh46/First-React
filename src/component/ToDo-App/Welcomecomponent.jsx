import { BrowserRouter,Routes,Route, useNavigate, useParams } from 'react-router-dom'
import { useContext } from 'react'
export default function WelcomeComponent(){

    const {username} = useParams()
    return (
        <div className="welcome">
            <h1>Welcome {username}</h1>
        </div>
    )
}