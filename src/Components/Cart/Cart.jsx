//import { ShoppingCart } from '@mui/icons-material';
import React, { useState, useEffect } from 'react'
import {auth, database} from '../config/firebaseConfig'
import IndividualProduct from './IndividualProduct';
import {Grid} from '@material-ui/core'
import {ClipLoader} from 'react-spinners/ClipLoader'


function Cart() {

  const [cartProducts, setCartProducts] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user =>{
      database.collection('Cart' + user.uid).onSnapshot(snapshot => {
        setLoading(true) 
        const newCartProduct = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),  
        })) 
        setCartProducts(newCartProduct)
      })       
    })    
    setLoading(false)  
  }, [])
 
  
  //console.log(cartProducts);

  return (
    <>
    {isLoading ? (
       <div>Loading...</div>

    ) : (
      <>
       {cartProducts.length > 0 && (
      <div className="cartcontainer">
        <h1>Cart</h1>
        <div className="products">
        <Grid container justifyContent = 'center' >
          {cartProducts.map((cartProduct) => (
             <Grid item key = {cartProduct.ID} xs = {12} sm = {6} md = {4} lg={3}> 
                <IndividualProduct  cartProduct = {cartProduct} />
              </Grid>
          ))}
        </Grid>
        </div>
      </div>
    )}
      </>
    )}
  
   {cartProducts.length < 1 && (
      <div>No Products.Start adding some</div>
    )}

    </>
  )
}

export default Cart