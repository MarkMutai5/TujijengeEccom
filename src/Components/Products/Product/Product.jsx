import { CardMedia, Typography, Card, IconButton, Button } from '@material-ui/core'
import { AddShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import './style.css'

function Product({product}) {
  return (
    
    <>
    
     <div className="container" >
        {product.img}
        <Typography variant='h4'> {product.name}</Typography>
       <Typography variant='h5'> {product.description}</Typography>
       <Typography variant='h5' gutterBottom> {product.price}</Typography>
        <Button variant = 'outlined' color="success" startIcon =  {<AddShoppingCartOutlined />}>Add To Cart</Button>
     
    </div>
    </>    
   
  )
}

export default Product