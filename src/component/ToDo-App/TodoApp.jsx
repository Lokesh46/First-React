import './TodoApp.css'
import { BrowserRouter,Routes,Route, useNavigate, useParams, Navigate } from 'react-router-dom'
import LogoutComponent from './LogoutComponent'
import LoginComponent from './LoginComponent'
import ErrorComponent from './ErrorComponent'
import HeaderComponent from './HeaderComponent'
import WelcomeComponent from './Welcomecomponent'
import ListTodosComponent from './ListTodosComponent'
import FooterComponent from './FooterComponent'
import AuthProvider, { useAuth } from './Security/AuthContext'
import TodoComponent from './ToDoComponent'
import DoneTodosComponent from'./DoneTodosComponent'
function AuthenticatedRoute({children}){
    const authContext = useAuth()
    if(authContext.isAuthenticated)
        return children
    return <Navigate to="/"/>
}
export default function TodoApp(){
    return (
        <div>
            <AuthProvider>
                <BrowserRouter>
                <HeaderComponent/>
                    <Routes>
                    <Route path='/' element={<LoginComponent/>}/>
                        <Route path='/login' element={<LoginComponent/>}/>
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        }/>
                        <Route path='*' element={<ErrorComponent/>}/>

                        <Route path='/list-todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/todos/:id' element={
                            <AuthenticatedRoute>
                                <TodoComponent/>
                            </AuthenticatedRoute>
                        }/>

                        <Route path='/todos/done' element={
                            <AuthenticatedRoute>
                                <DoneTodosComponent/>
                            </AuthenticatedRoute>
                        }/>
                        
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        }/>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
            </AuthProvider>
            
        </div>
    )
}

