import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { IconButton,  TextField } from '@mui/material';

function Login() {

    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passwordType, setPasswordType] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault()
        //console.log(email, password);
        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            setEmail('')
            setPassword('')
            setError('')
            navigate('/home') // works perfectly
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
            <TextField type = {passwordType ? "text" : "password"} placeholder = 'Enter password' required
            onChange={(e) => setPassword(e.target.value)} value = {password}

            InputProps = {{
                endAdornment :
                    <InputAdornment position='end'>
                        
                            { !passwordType ? <IconButton onClick={() => setPasswordType(true)}> <VisibilityIcon></VisibilityIcon></IconButton> : <IconButton onClick={() => setPasswordType(false)}> <VisibilityOffIcon></VisibilityOffIcon></IconButton>  }
                       
                    </InputAdornment>,
                
            }}
            
            ></TextField>
            
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