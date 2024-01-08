import React from 'react';
import Logincss from './Login.scss';
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {toast} from "react-toastify"
import {loginUser} from "../../Services/userService"

const Login = (props) => {
    let history = useHistory();

    const [keyLogin, setKeyLogin] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        let session = sessionStorage.getItem('account')
        if (session) {
            history.push("/")
        }
    },[])

    const handleLogin = async () => {
        if (!keyLogin) {
            toast.error("Please enter email")
            return;
        }
        if (!password) {
            toast.error("Please enter password")
            return;
        }

        let response = await loginUser(keyLogin, password)
        if (response && response.data && +response.data.EC === 0 ) {
            toast.success(response.data.EM)
            let data = {
                isAuthenticated: true,
                token: 'fake token'
            }
            sessionStorage.setItem('account', JSON.stringify(data))
            history.push("/user")
            window.location.reload()

        }

        if (response && response.data && +response.data.EC !== 0 ) {
            toast.error(response.data.EM)
        }
    } 

    const handPressEnter = (event) => {
        console.log(event);
        if (event.keyCode === 13) {
            handleLogin()
        }
    }
    const handleCreateNewAccount = () => {
        console.log('register new account');
        history.push("/register");
    }

    return (
        <div className='login-container'>
            <div className='container pt-4'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 col-sm-7 d-none d-sm-block'>
                        <div className='brand'>Facebook</div>
                        <div>Connect you with people </div>
                    </div>
                    <div className='content-right shadow-lg col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>Facebook</div>
                        <input type='text' className='form-control' placeholder='Email address'
                            value={keyLogin} onChange={(event) => setKeyLogin(event.target.value) }
                        />
                        <input type='password' className='form-control' 
                        value={password} onChange={(event) => setPassword(event.target.value) }
                        onKeyDown={(event) => handPressEnter(event)}
                        />
                        <button onClick={() => handleLogin()} className='btn btn-primary'>
                            Login
                        </button>
                        <span className="text-center">
                            <a href='#' className='forget-password'>
                                Forgot your password?
                            </a>
                        </span>
                        <hr></hr>
                        <button className='btn btn-success' onClick={() => handleCreateNewAccount()}>
                            Create new account
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;