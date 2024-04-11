import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {db} from '../firebase'
import {collection, getDocs} from 'firebase/firestore'
import { toast} from "react-toastify";
import '../style/Login.css'

import bichon from '../resources/image/bichon.png'

var md5 = require('md5')

function Login(){

    let navigate = useNavigate();
    const initialValues = {username: '', password: ''}
    const [loginlist, setloginlist] = useState<any[]>([])
    const [logindetails,setlogindetails] = useState<any[]>([])
    const [loginPW, setloginPW] = useState<any[]>([])

    useEffect(()=>{
        async function fetchstuff(){
            await getDocs(collection(db,'login')).then(response=>{
                let temp = response.docs.map((val,key)=>({data: val.data()}))
                const usernameList = []
                const passwordList = []
                const nameList = []

                for(let i=0;i<temp.length;i++){
                    usernameList.push(temp[i].data.username)
                    nameList.push(temp[i].data.name)
                    passwordList.push(temp[i].data.password)
                }

                setloginlist(usernameList)
                setlogindetails(nameList)
                setloginPW(passwordList)
            })
        }
        fetchstuff()
    },[])
    
    function validationSchema() {
        return Yup.object().shape({
          username: Yup.string().required("Username required!"),
          password: Yup.string().required("Password required!"),
        });
    }

    async function handleLogin(formValue: { username: string; password: string; }) {
        for(let i=0;i<loginlist.length;i++){
            if(loginlist[i] === formValue.username){
                if(md5(formValue.password) === loginPW[i]){
                    sessionStorage.setItem('name', logindetails[i])
                    sessionStorage.setItem('toast', 'true')
                    navigate('/dearest')
                    window.location.reload()
                    return
                }   
            }
        }
        toast.error('Username or password invalid')
    }

    return(
        <div className='formclass'>
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            >
                <Form>
                <div className="imgcontainer">
                <img src={bichon} alt="Avatar" className="avatar"/>
                </div>

                <div className='container'>
                    <div className="form-group">
                        <label htmlFor="username">Username UwU</label>
                        <Field name="username" type="text" className="form-control" />
                        <ErrorMessage
                        name="username"
                        component="div"
                        className="alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" className="form-control" />
                        <ErrorMessage
                        name="password"
                        component="div"
                        className="alert-danger"
                        />
                    </div>
                </div>

                    <div className="form-group">
                        <button type="submit" className="button">
                        <span>Login</span>
                        </button>
                    </div>
                
                </Form>
            </Formik>
        </div>
    )
}

export default Login;