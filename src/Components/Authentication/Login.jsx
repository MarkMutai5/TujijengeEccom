import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebaseConfig';
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import './login.css'
import { IconButton,  TextField } from '@mui/material';
import { Button } from '@material-ui/core';
import { useFormik } from 'formik'
import * as Yup from "yup";
import {  toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

function Login() {

    let navigate = useNavigate()

    const [error, setError] = useState('')
    const [passwordType, setPasswordType] = useState(false)

    const formik = useFormik({
        initialValues:{
            email : "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: values =>{
            auth.signInWithEmailAndPassword(formik.values.email, formik.values.password)
            .then(() => {
                toast.success('Login successful')
                navigate('/home')
            })
            .catch((err => setError(err.message)))
          }
    })


  return (
    <>
    <Navbar/>
    <img src='TUJIJENGE.png' alt='' />
    <div className='login'>
        <h1>Login Form</h1>
        <form onSubmit={formik.handleSubmit} autoComplete = 'off'>
            
            
            <br />
            <TextField sx={{ m: 1, width: '50rem' }} type = 'email' label = 'Email' variant = 'outlined' 
            name = 'email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error = {Boolean(formik.touched.email && formik.errors.email)}
            helperText = {formik.touched.email && formik.errors.email} 
             >
            </TextField>
            <br />

            
            <br />
            <TextField sx={{ m: 1, width: '50rem' }} type = {passwordType ? "text" : "password"} label = 'Password' variant = 'outlined' 
            name = 'password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error = {Boolean(formik.touched.password && formik.errors.password)}
            helperText = {formik.touched.password && formik.errors.password} 
            

            InputProps = {{
                endAdornment :
                    <InputAdornment position='end'>
                        
                            { !passwordType ? <IconButton onClick={() => setPasswordType(true)}> <VisibilityIcon></VisibilityIcon></IconButton>
                             :
                              <IconButton onClick={() => setPasswordType(false)}> <VisibilityOffIcon></VisibilityOffIcon></IconButton>  }
                       
                    </InputAdornment>,
                
            }}
            
            ></TextField>
            
            <br />
            <Button variant='outlined'  size="large" type = 'submit' >LOGIN</Button>

            <p>Don't have an account ?
                <Link to = '/signup'>Join Us</Link>
            </p>
            {error && <span className='errormsg'>{error}</span>}
            
        </form>
    </div>
    </>
  )
}

export default Login