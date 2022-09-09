import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import './login.css'

function Login() {

    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = (e) => {
        e.preventDefault()
        //console.log(email, password);
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            setEmail('')
            setPassword('')
            setError('')
            navigate('/') // works perfectly
        })
        .catch((err => setError(err.message)))
    }


  return (
    <div className='login'>
        <h1>Login Form</h1>
        <form onSubmit={handleLogin} autoComplete = 'off'>
            
            <label htmlFor='email'>Email:</label>
            <br />
            <input type = 'email' placeholder = 'xyz@domain.com' required
            onChange={(e) => setEmail(e.target.value)} value = {email} />
            <br />

            <label htmlFor='password'>Password:</label>
            <br />
            <input type = 'password' placeholder = 'Enter password' required
            onChange={(e) => setPassword(e.target.value)} value = {password}/>
            <br />
            <button type = 'submit' onClick={handleLogin}>LOGIN</button>

            <p>Don't have an account ?
                <Link to = '/signup'>Create</Link>
            </p>
            {error && <span className='errormsg'>{error}</span>}
        </form>
    </div>
  )
}

export default Login