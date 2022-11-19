
import React, { useState, useEffect } from 'react'
import {auth, database} from '../config/firebaseConfig'
import {Box, Grid, IconButton, Paper, TableBody, TableCell, Typography} from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { getCartProducts } from '../../Slices/CartSlice';
import {  Button, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import Spinner from '../Spinner/Spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';


function Cart() {

  let navigate = useNavigate()

  const [cartProducts, setCartProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { 
    auth.onAuthStateChanged(user =>{
      if(user){
        database.collection('Cart' + user.uid).onSnapshot(snapshot => {
          const newCartProduct = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),  
          })) 
          setCartProducts(newCartProduct)
          setLoading(false)
        })
      } 
      else{
        setLoading(false)
      }      
    })    
  }, [])

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   dispatch(getCartProducts())
  // }, [])

  let Item

  const handleIncrease = (cartProduct) => {
    //console.log(cartProduct);
    Item = cartProduct
    Item.qty = Item.qty + 1
    Item.TotalProductPrice = Item.qty * Item.ProductPrice
    auth.onAuthStateChanged(user =>{
      database.collection('Cart' + user.uid).doc(cartProduct.ID)
      .update(Item).then(() => {
        console.log('Updated');
      })
    })
    
  }

  const handleDecrease = (cartProduct) => {
    Item = cartProduct
    if (Item.qty > 1) {
      Item.qty = Item.qty - 1
      Item.TotalProductPrice = Item.qty * Item.ProductPrice
      auth.onAuthStateChanged(user =>{
        database.collection('Cart' + user.uid).doc(cartProduct.ID)
        .update(Item).then(() => {
          console.log('reduced');
        })
      }) 
    }
  }

  const handleDelete = (cartProduct) => {
    Item = cartProduct
    auth.onAuthStateChanged(user =>{
      database.collection('Cart' + user.uid).doc(cartProduct.ID).delete().then(()=> {
        console.log('deleted');
      })
  })
}
  

    //getting price of cart products
    const price = cartProducts.map(cartproduct => {
      return cartproduct.TotalProductPrice
    })

    //reducing the price to a single value
    const reducerofprice = (accumulator, currentValue) => accumulator + currentValue
    const totalPrice = price.reduce(reducerofprice, 0)

    //console.log(totalPrice);

  return (
    
      <>
      { loading && ( <Spinner />)}
      { cartProducts.length > 0 ? (
        <>
        <TableContainer component = {Paper} style = {{marginTop: '1rem', width: '100%'}}>
        <Table sx = {{minWidth: 450 }} aria-label="simple table">
          <TableHead sx= {{backgroundColor: 'lightblue'}}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  
          {cartProducts.map((cartProduct) => (
            <TableRow key = {cartProduct.Id} 
            sx = {{'&:last-child td, &:last-child th': {  border: 0 },  minHeight: '2rem'}}>
              <TableCell component="th" scope="row">
                  {cartProduct.ProductName}
              </TableCell>
              <TableCell >{cartProduct.ProductName}</TableCell>
              <TableCell >KSH{cartProduct.TotalProductPrice}</TableCell>
              <TableCell > 
                <IconButton onClick = {() => handleDecrease(cartProduct)}>-</IconButton>
                  {cartProduct.qty}
                <IconButton onClick = {() => handleIncrease(cartProduct)}>+</IconButton>
              </TableCell>
              <TableCell >
                <IconButton onClick={() => handleDelete(cartProduct)}>
                    <DeleteIcon/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx= {{backgroundColor: 'lightblue'}}>
            <TableCell  colspan = {6} style = {{display: 'flex', justifyContent: 'space-between'}}>
              <b>Total cost: KSH {totalPrice}</b>
              <Button variant = 'outlined' onClick = {() => navigate('/checkout')}>CHECKOUT</Button>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      

 
      </>
      ) : (
        <>
          <h6>No products in your cart <Link to = '/home'>Start Adding Some</Link></h6>
        </>
        
      )}
    
    
   

    </>
  )
}

export default Cart