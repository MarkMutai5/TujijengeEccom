import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { IconButton,  TextField } from '@mui/material';
import { Button } from '@material-ui/core';

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
            
            
            <br />
            <TextField sx={{ m: 1, width: '50rem' }} type = 'email' label = 'Email' variant = 'outlined' required
            onChange={(e) => setEmail(e.target.value)} value = {email} >
            </TextField>
            <br />

            
            <br />
            <TextField sx={{ m: 1, width: '50rem' }} type = {passwordType ? "text" : "password"} label = 'Password' variant = 'outlined' required
            onChange={(e) => setPassword(e.target.value)} value = {password}

            InputProps = {{
                endAdornment :
                    <InputAdornment position='end'>
                        
                            { !passwordType ? <IconButton onClick={() => setPasswordType(true)}> <VisibilityIcon></VisibilityIcon></IconButton> : <IconButton onClick={() => setPasswordType(false)}> <VisibilityOffIcon></VisibilityOffIcon></IconButton>  }
                       
                    </InputAdornment>,
                
            }}
            
            ></TextField>
            
            <br />
            <Button variant='outlined'  size="large" type = 'submit' onClick={handleLogin} >LOGIN</Button>

            <p>Don't have an account ?
                <Link to = '/signup'>Join Us</Link>
            </p>
            {error && <span className='errormsg'>{error}</span>}
            
        </form>
    </div>
  )
}

export default Login