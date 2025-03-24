import {useParams } from 'react-router-dom'
import { useContext, useState } from 'react'
import { returnHelloWorld, returnHelloWorldBean, returnHelloWorldPathVariable } from './API/HelloWorldApiService'
import { useAuth } from './Security/AuthContext'
export default function WelcomeComponent(){

    const {username} = useParams()
    const [msg, setMsg] = useState(null)

    const authContext = useAuth()

    // const callHelloWorldRESTAPI = () => {
    //     returnHelloWorld()
    //         .then((response) => {
    //             setMsg(response.data)
    //         })
    //         .catch(error => console.log(error))
    //         .finally(() => console.log('Clean up'))
    // }

    // const callHelloWorldBeanRESTAPI = () => {
    //     returnHelloWorldBean()
    //         .then((response) => {
    //             console.log(response)
    //             setMsg(response.data.message)
    //         })
    //         .catch(error => console.log(error))
    //         .finally(() => console.log('Clean up'))
    // }

    const callHelloWorldPathVariable = () => {
        returnHelloWorldPathVariable('test',authContext.token)
            .then((response) => {
                console.log(response)
                setMsg(response.data.message)
            })
            .catch(error => console.log(error))
            .finally(() => console.log('Clean up'))
    }
    return (
        <div className="welcome">
            <h1>Welcome {username}</h1>
            {/* <div>
                <button className="btn btn-primary" onClick={callHelloWorldRESTAPI}>call Hello World Page</button>
            </div>

            <div>
                <button className="btn btn-primary" onClick={callHelloWorldBeanRESTAPI}>call Hello World Bean </button>
            </div> */}

            <div>
                <button className="btn btn-primary" onClick={callHelloWorldPathVariable}>call Hello Path Variable </button>
            </div>

            <div className="text=info">{msg}

            </div> 
        </div>
    )
}