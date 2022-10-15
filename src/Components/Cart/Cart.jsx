
import React, { useState, useEffect } from 'react'
import {auth, database} from '../config/firebaseConfig'
import IndividualProduct from './IndividualProduct';
import {Grid, Typography} from '@material-ui/core'
import { Card } from '@mui/material';


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
 

  //getting qty of cartproducts
    const qty = cartProducts.map(cartproduct => {
      return cartproduct.qty
    })

    //console.log(qty);

    //reducing the qty to a single value
    const reducerofQty = (accumulator, currentValue) => accumulator + currentValue
    const totalqty = qty.reduce(reducerofQty, 0)
    //console.log(totalqty);


    //getting price of cart products
    const price = cartProducts.map(cartproduct => {
      return cartproduct.TotalProductPrice
    })

    //reducing the price to a single value
    const reducerofprice = (accumulator, currentValue) => accumulator + currentValue
    const totalPrice = price.reduce(reducerofprice, 0)

    console.log(totalPrice);


  return (
    
      <>
      
       {cartProducts.length > 0 && (
      <div className="cartcontainer">
        <h1>Cart</h1>
        <div className="products">

        <Grid container justifyContent = 'center' >
          {cartProducts.map((cartProduct) => (
             <Grid item key = {cartProduct.ID} xs = {12} sm = {6} md = {4} lg={3}> 
                <IndividualProduct key = {cartProduct.ID} cartProduct = {cartProduct} />
              </Grid>
          ))}
        </Grid>

        <Card sx={{maxWidth: '200px'}}>
          <Typography variant = 'body1'>CART DETAILS</Typography>
          <Typography variant = 'body2'>Total no of items:</Typography>
           <Typography  variant = 'body2'> {totalqty} </Typography>
          <Typography  variant = 'body2'>Total amount:</Typography> 
          <Typography  variant = 'body2'> {totalPrice} </Typography>
        </Card>
      
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