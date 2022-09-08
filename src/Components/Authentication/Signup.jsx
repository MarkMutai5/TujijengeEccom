import React from 'react'
import { useState } from 'react'
import './signup.css'
import {auth, database} from '../config/firebaseConfig'
import { Link } from 'react-router-dom'

function Signup() {

    const [name, setName] = useState(' ')
    const [email, setEmail] = useState(' ')
    const [password, setPassword] = useState(' ')
    const [error, setError] = useState(' ')


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
                setName(' ')
                setEmail(' ')
                setPassword(' ')
                setError(' ')
            }).catch(err => setError(err.message))
        }).catch(err => setError(err.message))
    }

  return (
    <>
        <div className="signup">
            <h1>Sign up form</h1>
            <form className='signupform' onSubmit = {handleSignup} autoComplete = 'on'>

                <label htmlFor='Name'>Name:</label>
                <br />
                <input type='text' placeholder='Name' required 
                onChange={(e) => setName(e.target.value) } value = {name}/>
                <br />

                <label htmlFor='email'>Email:</label>
                <br />
                <input type='email' placeholder='xyz@email.com' required
                onChange={(e) => setEmail(e.target.value) } value = {email}/>
                <br />

                <label htmlFor='password'>Password:</label>
                <br />
                <input type='password' placeholder='Enter password' required
                onChange={(e) => setPassword(e.target.value) } value = {password}/>
                <br />

                <button type='submit' onClick={() => handleSignup}>Sign up</button>
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