import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import {getUserID} from '../../Slices/UserSlice'
import { auth } from '../config/firebaseConfig'

function User() {

  const dispatch = useDispatch()
  dispatch(getUserID())

  // const person = useSelector((state) => state.getuser.user)
  // console.log(person);

  auth.onAuthStateChanged(user => {
    if (user){
      localStorage.setItem("user", getUserID(user))
      console.log(user.toJSON().uid)
      
    }
    else{
      //sessionStorage.setItem("user", getUserID(user))
      console.log('nothing');
    }
  })


  
  return (
    <div>User</div>
  )
}

export default User