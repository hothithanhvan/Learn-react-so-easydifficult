import React, { useEffect, useState } from 'react';
import Logincss from './Register.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { register } from '../../Services/userService';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Register = (props) => {
    let history = useHistory();
    const handleLogin = (props) => {
        history.push("/login");
    }
   
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const defaultValid = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPassword: true
    }
    const [checkInput, setCheckInput] = useState(defaultValid)

    const checkValidInput = () => {
        setCheckInput(defaultValid)
        if (!email) {
            toast.error("Please enter email address!")
            setCheckInput({...defaultValid, 
                isValidEmail: false
            })
            return false;
        }
        let re = /\S+@\S+\.\S+/;
        if (re.test(email) == false) {
            setCheckInput({...defaultValid, 
                isValidEmail: false
            })
            toast.error("Please enter a valid email address");
            return false;
        }
        if (!phone) {
            toast.error("Please enter phone!")
            return false;
        }
        if (!password) {
            toast.error("Please enter password!")
            return false;
        }
        if (password != confirmPassword) {
            toast.error("Passwword is incorrect!")
            return false;
        }
        return true;
        
    }

    const handleRegister = async () => {
        let check = checkValidInput()
        let user = {email, phone, username, password, confirmPassword}
        console.log(user);
        if(check == true ) {
            let res = await register(email, phone, password, username)
            console.log(res.data);
            if (res.data.EC === 0) {
                toast.success(res.data.EM)
                history.push("/login")
            }
            else {
                toast.error(res.data.EM)
            }
        }
        
    }
    

    return (
        <div className='register-container'>
            <div className='container pt-4'>
                <div className='row px-3 px-sm-0'>
                    <div className='content-left col-12 col-sm-7 d-none d-sm-block'>
                        <div className='brand'>Facebook</div>
                        <div>Connect you with people </div>
                    </div>
                    <div className='content-right shadow-lg col-sm-5 col-12 d-flex flex-column gap-3 py-3'>
                        <div className='brand d-sm-none'>Facebook</div>
                        <div className='form-control'>
                            <label>Email</label>
                            <input type='text' className={checkInput.isValidEmail ? 'form-control' : 'form-control is-invalid'} placeholder='Email address' 
                            value={email} onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label>Phone</label>
                            <input type='text' className={checkInput.isValidPhone ? 'form-control' : 'form-control is-invalid'} placeholder='Phone number' 
                            value={phone} onChange={(event) => setPhone(event.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label>UserName</label>
                            <input type='text' className= 'form-control' placeholder='Username' 
                            value={username} onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label>Password</label>
                            <input type='password' className={checkInput.isValidPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' 
                            value={password} onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className='form-control'>
                            <label>Nhập lại Password</label>
                            <input type='password' className={checkInput.isValidConfirmPassword ? 'form-control' : 'form-control is-invalid'} placeholder='Password' 
                            value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </div>

                        <button className='btn btn-primary' onClick={() => handleRegister()}>Register</button>
                        <hr></hr>
                        <button className='btn btn-success' onClick={() => handleLogin()}>
                            Already have an account. Login ?
                        </button>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Register;