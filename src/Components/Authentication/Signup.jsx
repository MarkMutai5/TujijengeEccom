import React from 'react'
import { useState } from 'react'
import './signup.css'
import {auth, database} from '../config/firebaseConfig'
import { Link, useNavigate } from 'react-router-dom'
import { IconButton,  TextField } from '@mui/material';
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@material-ui/core'

function Signup() {

    let navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [passwordType, setPasswordType] = useState(false)


    const handleSignup = (e) => {
        e.preventDefault()
        //console.log(name, email, password);
        auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
            database.collection('Userslist').doc(cred.user.uid).set({
                Name: name,
                Email: email,
                Password: password
            })
            .then(() => {
                setName('')
                setEmail('')
                setPassword('')
                setError('')
                navigate('/login') //check documentation
            }).catch(err => setError(err.message))
        }).catch(err => setError(err.message))
    }

  return (
    <>
    <img src='TUJIJENGE-light.png' alt = ''/>
        <div className="signup">
            <h1>Sign up form</h1>
            <form className='signupform' onSubmit = {handleSignup} autoComplete = 'on'>

                
                <br />
                <TextField sx={{ m: 1, width: '50rem' }}  type='text' label='Name' variant = 'outlined' required 
                onChange={(e) => setName(e.target.value) } value = {name}/>
                <br />

                
                <br />
                <TextField sx={{ m: 1, width: '50rem' }}  type='email' label='Email' variant = 'outlined' required
                onChange={(e) => setEmail(e.target.value) } value = {email}/>
                <br />

                
                <br />
                <TextField sx={{ m: 1, width: '50rem' }} type = {passwordType ? "text" : "password"} label='Password' required
                onChange={(e) => setPassword(e.target.value) } value = {password}
                
                InputProps = {{
                    endAdornment :
                        <InputAdornment position='end'>
                            
                                { !passwordType ? 
                                    <IconButton onClick={() => setPasswordType(true)}> <VisibilityIcon></VisibilityIcon></IconButton>
                                     : 
                                     <IconButton onClick={() => setPasswordType(false)}> <VisibilityOffIcon></VisibilityOffIcon></IconButton>  }
                           
                        </InputAdornment>,
                    
                }}
                />
                <br />

                <Button variant = 'outlined'  size="large" type='submit' onClick={() => handleSignup}>Sign up</Button>
                <br />

                <p className='prompt'>Already have an account?  
                <Link to = "/login" >Login Here</Link></p>

                {error && <span className='errormsg'>{error}</span>}
            </form>
        </div>
    </>
  )
}

export default Signup