import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.jfif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerRouter } from '../utils/APIRouter';
function Register() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const { email, username, password } = values;
            const { data } = await axios.post(registerRouter, {
                username,
                email,
                password,
            });
            if (!data.status) {
                toast.error(data.msg, toastOptionsError);
            }
            if (data.status) {
                toast.success('user created !', toastOptionsSuccess);
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                setTimeout(()=> {
                    navigate("/");
                }, 3000);
            }
        }
    };
    const toastOptionsSuccess = {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
    };
    const toastOptionsError = {
        position: 'bottom-right',
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
    };
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/');
        }
    }, []);
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword) {
            toast.error('Passsword and confirm password should be same.', toastOptionsError);
            return false;
        }
        else if(username.length < 3)
        {
            toast.error('Username should be greater than 3 characters.', toastOptionsError);
            return false;
        }
        else if(password.length < 8)
        {
            toast.error('Password should be equal or greater than 8 characters.', toastOptionsError);
            return false;
        }
        // else if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(password)))
        // {
        //     toast.error('Password is not strong', toastOptionsError);
        //     return false;
        // }
        else if(!(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)))
        {
            toast.error('Email is not format', toastOptionsError);
            return false;
        }
        else if(email === '')
        {
            toast.error('Email is required.', toastOptionsError);
            return false;
        }
        return true;
    };
    return (
        <React.Fragment>
            <FormContainer>
                <form action="" method="post" onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt="logo" />
                        <h1>message</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={(e) => handleChange(e)}
                    />
                    <button type="submit">Create User</button>
                    <span>
                        Already have an account ?{' '}
                        <Link to="/login">Login.</Link>
                    </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </React.Fragment>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #131234;
    .brand {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        img {
            height: 5rem;
            margin-left: -20px;
        }
        h1 {
            color: white;
            text-transform: uppercase;
        }
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #00000076;
        border-radius: 2rem;
        padding: 3rem 4rem;
        input {
            background-color: transparent;
            padding: 1rem;
            border: 0.1rem solid #39eaf9;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;
            &:focus {
                border: 0.1rem solid #1a7d82;
                outline: none;
            }
        }
        button {
            background-color: #1ba69b;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            line-height: 100%;
            text-transform: uppercase;
            transition: 0.3s ease-in-out;
            &:hover {
                background-color: #06605e;
            }
        }
        span {
            text-transform: uppercase;
            color: white;
            a {
                color: #3e77a4;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;
export default Register;
