import {useNavigate, useParams } from 'react-router-dom'
import { createTodoApi, getTodoApi, updateTodoApi } from './API/ToDoApiService'
import { useAuth } from './Security/AuthContext'
import { useEffect, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import toast from 'react-hot-toast'
import moment from 'moment'

function ToDoComponent() {  

    const {id} = useParams()
    const [todo,setTodo] = useState([])
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()

    function getTodo(){
        if(id!=-1){
            getTodoApi(username, id)
                .then((response) => {
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                    setTodo(response.data)
                    
                })
                .catch(error => console.log(error))
                .finally(() => console.log('Clean up'))
        }
    }

    function onSubmit(values){
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }

        //console.log(todo)
        if(id==-1){
            createTodoApi(username,todo)
            .then((response) => {
                navigate('/list-todos')
                if (response.status === 204) { 
                    toast.success("Todo Updated successfully!", { position: "top-right" });
                }
            })
            .catch(error => console.log(error))
        } else {
            updateTodoApi(username, id, todo)
            .then((response) => {
                navigate('/list-todos')
                if (response.status === 204) { 
                    toast.success("Todo Updated successfully!", { position: "top-right" });
                }
            })
            .catch(error => console.log(error))
        }
    }

    function validate(values){
        let errors = {
            // description: 'Enter a valid description',
            // targetDate: 'Enter a valid target date'
        }

        if(values.description.length<5)
            errors.description= 'Enter atleast 5 characters'
        
        if(!values.targetDate || !moment(values.targetDate).isValid())
            errors.targetDate= 'Enter Date'
        return errors
    }

    useEffect (
        () => getTodo(),[id]
    )
    return (
        <div className="container" style={{ paddingTop: '120px' }}>
            <h1>Enter ToDo Details</h1>
            <div>
                <Formik initialValues={ { description, targetDate } }
                    enableReinitialize={true}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnChange = {false}
                    validateOnBlur = {false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage 
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                    // placeholder="Enter description"
                                />

                                <ErrorMessage 
                                    name="targetDate"
                                    component="div"
                                    className = "alert alert-warning"
                                />
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <Field type="text" className="form-control" name="description" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Target Date</label>
                                    <Field type="date" className="form-control" name="targetDate" />
                                </fieldset>
                                <div>
                                    <button type="submit" className="btn btn-success m-5">Update</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}

export default ToDoComponent