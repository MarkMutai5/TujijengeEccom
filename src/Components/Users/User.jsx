import React, { useContext } from 'react'
import { UserContext } from '../../global/UserContext'

function User() {
    const {currentUser} = useContext(UserContext)
    console.log(currentUser)
    
  return (
    <div>User</div>
  )
}

export default User