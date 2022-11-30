
import React, { useState, useEffect } from 'react'
import {auth, database} from '../config/firebaseConfig'
import {Box, createTheme, IconButton, Paper, styled, TableBody, TableCell, Tooltip, Typography} from '@material-ui/core'
import {  Button, Table, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import Spinner from '../Spinner/Spinner';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import PaymentIcon from '@mui/icons-material/Payment';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import StripeCheckout from 'react-stripe-checkout';


const theme = createTheme();

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))


function Cart( {currentUser, uid} ) {

  let navigate = useNavigate()

  //console.log(currentUser)

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

  //console.log(cartProducts)

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


    const formik = useFormik({
      enableReinitialize: true,
      initialValues: {
        email: `${currentUser?.email}`,
        amount: `${totalPrice} `,
        phone: "",
        address: ""
      },
      validationSchema: Yup.object({
        phone: Yup.string().required('Phone Number is required').min(10, 'Phone number should be at least 10 digits').max(13, 'Phone number should not be longer than 13 digits'),
        address: Yup.string().required('Address is required'),
      }),
      onSubmit: values => {
        //console.log(formik.values.email, formik.values.amount)
        toast.promise(
          database.collection('Orders').add({
            Email: formik.values.email,
            Amount: formik.values.amount,
            PhoneNumber: formik.values.phone,
            Address: formik.values.address,
            UserId: uid,
            Status: 'Pending',
          }),
           {
             loading: 'Filling up your order...',
             success: 'Order uccessfully placed',
             error: err => err.message,
           }
         ).then(()=> {
          toast('Thank you for visiting us. You will be redirected to the home page in 6 seconds',{
            duration: 6000,
          })
          setTimeout(() => {
            navigate('/home')
          }, 5000);
         })
      }
    })


    const onToken = (token) => {
      console.log(token)
    }
  

  return (
    
      <>
      { loading && ( <Spinner />)}
      { cartProducts.length > 0 ? (
        <>
        <TableContainer component = {Paper} style = {{marginTop: '1rem', marginLeft: '2rem', width: '80%'}}>
        <Table sx = {{minWidth: 450 }} aria-label="simple table">
          <TableHead  sx= {{backgroundColor: theme.palette.info.dark}}>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  
          {cartProducts.map((cartProduct) => (
            <TableRow key = {cartProduct.ID} 
            sx = {{'&:last-child td, &:last-child th': {  border: 0 },  minHeight: '2rem'}}>
              <TableCell component="th" scope="row">
                {cartProduct.ProductName}
              </TableCell>
              <TableCell >KSH{cartProduct.TotalProductPrice}</TableCell>
              <TableCell > 
                <IconButton color = 'error' onClick = {() => handleDecrease(cartProduct)}>-</IconButton>
                  {cartProduct.qty}
                <IconButton color = 'success' onClick = {() => handleIncrease(cartProduct)}>+</IconButton>
              </TableCell>
              <TableCell >
                <Tooltip title = 'Remove item'>
                <IconButton color = 'error' onClick={() => handleDelete(cartProduct)}>
                    <DeleteIcon/>
                </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          <TableRow > 
            <TableCell  colSpan = {6} style = {{display: 'flex', justifyContent: 'space-between'}}>
              <b>Total cost: KSH {totalPrice}</b>
            </TableCell>
          </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PaymentIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            CHECKOUT
          </Typography>
          <Box component="form" onSubmit={ formik.handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              value = {currentUser.email}
              disabled = {true}
              id="email"
              label="Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              error = {Boolean(formik.touched.phone && formik.errors.phone)}
              helperText = {formik.touched.phone && formik.errors.phone} 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="address"
              label="Delivery Address"
              name="address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
              error = {Boolean(formik.touched.address && formik.errors.address)}
              helperText = {formik.touched.address && formik.errors.address} 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              disabled = {true}
              id="amount"
              label="Amount Payable"
              name="amount"   
              value = {totalPrice}           
            />
            <Box sx = {{display: 'flex', justifyContent: 'space-between', marginBottom: '2rem'}}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, width: '40%'}}
            >
             PAY ON DELIVERY
            
            </Button>
            <Box sx= {{width: '50%', marginTop: '0.4rem'}}>
            <StripeCheckout
              token={onToken}
              name = 'Tujijenge'
              currency='KES'
              amount = {totalPrice * 100}
              email = {currentUser.email}
              stripeKey="pk_test_51M9cTFJOYDbDhTU0qHM8kqPenz2a9h8Wxmss3HKnaUM5cnIzIReeLBaXaQ2JTZAngTzoM8Nap2WlixrojSeuyrzp00c2nQBi3r"
            />
            </Box>            
            </Box>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
 

    

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