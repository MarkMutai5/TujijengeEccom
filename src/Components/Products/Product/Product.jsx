import {  Typography, Button } from '@material-ui/core'
import { AddShoppingCartOutlined } from '@mui/icons-material'
import React from 'react'
import './style.css'

function Product({product}) {
  return (
    
    <>
    
     <div className="container"  >
        <div className="media">
          <img src ={product.ProductUrl} alt = ' ' width= '240px'  />
        </div>
       <div className="content">
          <Typography variant='h4'> {product.ProductName}</Typography>
          <Typography variant='h5' gutterBottom> Ksh {product.ProductPrice}</Typography>
       </div>
       <div className="description">
          <Typography variant='h5'> {product.Description}</Typography>
       </div>

        <Button variant = 'outlined' startIcon =  {<AddShoppingCartOutlined />} className = 'cart'>Add To Cart</Button>
     
    </div>
    </>    
   
  )
}

export default Product