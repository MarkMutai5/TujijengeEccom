import React, {useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { getCartProducts } from '../../Slices/CartSlice'
// import {getUserID} from '../../Slices/UserSlice'
// import { auth } from '../config/firebaseConfig'

function User() {

  const dispatch = useDispatch()

  useEffect(() => {
    setTimeout(() => {
      dispatch(getCartProducts())
    }, 2000);
    
  }, [])

  const cartsliceproducts = useSelector((state) => state.cart.newproducts)
  console.log(cartsliceproducts)
  
  // dispatch(getUserID())

  // const person = useSelector((state) => state.getuser.user)
  // console.log(person);

  // auth.onAuthStateChanged(user => {
  //   if (user){
  //     localStorage.setItem("user", getUserID(user))
  //     //console.log(user.toJSON().uid)
      
  //   }
  //   else{
  //     //sessionStorage.setItem("user", getUserID(user))
  //     console.log('nothing');
  //   }
  // })

  
  return (
    <>
    <div>Carts</div>
    </>
  )
}

export default User