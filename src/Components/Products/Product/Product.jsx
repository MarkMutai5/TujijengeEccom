import { CardMedia, Typography, Card, IconButton, Button } from '@material-ui/core'
import { AddShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import './style.css'

function Product({product}) {
  return (
    
    <>
    
     <div className="container" >
        <div className="media">
          <img src = '/assets/helmet.png' alt = ' ' width= '240px'  />
        </div>
       <div className="content">
          <Typography variant='h4'> {product.name}</Typography>
          <Typography variant='h5' gutterBottom> {product.price}</Typography>
       </div>
       <div className="description">
          <Typography variant='h5'> {product.description}</Typography>
       </div>

        <Button variant = 'contained' color="success" startIcon =  {<AddShoppingCartOutlined />} className = 'cart'>Add To Cart</Button>
     
    </div>
    </>    
   
  )
}

export default Product