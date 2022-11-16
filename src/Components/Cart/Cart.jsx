
import React, { useState, useEffect } from 'react'
import {auth, database} from '../config/firebaseConfig'
import {Box, Grid, IconButton, Paper, TableBody, TableCell, Typography} from '@material-ui/core'
import { useDispatch } from 'react-redux';
import { getCartProducts } from '../../Slices/CartSlice';
import {  Table, TableContainer, TableHead, TableRow } from '@mui/material';
import Spinner from '../Spinner/Spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import {blue} from '@mui/material/colors';
import { Link } from 'react-router-dom';


const color = blue[600]

function Cart() {

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

    //console.log(totalPrice);


  return (
    
      <>
      { loading && ( <Spinner />)}
      { cartProducts.length > 0 ? (
        <>
        <TableContainer component = {Paper} style = {{marginTop: '1rem'}}>
        <Table sx = {{minWidth: 650 }} aria-label="simple table">
          <TableHead >
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
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx= {{backgroundColor: '#fafafa' }}>
      <Typography variant = 'body1'>CART DETAILS</Typography>
      <Typography variant = 'body2'>Total no of items:</Typography>
      <Typography  variant = 'body2'> {totalqty} </Typography>
      <Typography  variant = 'body2'>Total amount:</Typography>
      <Typography  variant = 'body2'> {totalPrice} </Typography>
      </Box>
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