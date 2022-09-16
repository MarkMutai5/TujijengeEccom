//import { ShoppingCart } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import {auth, database} from '../config/firebaseConfig'
import IndividualProduct from './IndividualProduct';
import {Grid} from '@material-ui/core'


function Cart() {

  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      database.collection('Cart' + user.uid).onSnapshot(snapshot => {
        const newCartProduct = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
        }))
        setCartProducts(newCartProduct)
      })
    })
  }, [])
  
  //console.log(cartProducts);
 


  return (
    <>
    {cartProducts.length > 0 && (
      <div className="cartcontainer">
        <h1>Cart</h1>
        <div className="products">
        <Grid container justifyContent = 'center' >
          {cartProducts.map((cartProduct) => (
             <Grid item key={cartProduct.ID} xs = {12} sm = {6} md = {4} lg={3}> 
                <IndividualProduct  cartProduct = {cartProduct} />
              </Grid>
          ))}
        </Grid>
        </div>
      </div>
    )}

    {cartProducts.length < 1 && (
      <div>No Products.Start adding some</div>
    )}

    </>
  )
}

export default Cart