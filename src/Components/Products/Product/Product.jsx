import {  Card, CardMedia, Typography, CardContent } from '@material-ui/core'
import { Button } from '@mui/material'
import React from 'react'
import './product.css'

 
function Product({product, addToCart}) {
  const handleAddtoCart = () => {
    addToCart(product)
  }

  return (
    
    <>
    
    <div style = {{paddingTop: '2rem'}} />
    <Card style={{maxWidth: '270px'}} >
        <CardMedia image = {product.ProductUrl} title = {product.ProductName} className = 'media' style ={{margin: '0.5rem'}}/>
        <CardContent >
          <div className='cardcontent'>
            <Typography gutterBottom variant ='body1'>
              {product.ProductName}
            </Typography>  
            <Typography variant = 'body1'>
              KSH{product.ProductPrice}
            </Typography>
          </div>
          <Typography color = 'textSecondary' variant = 'body2'>{product.Description}</Typography>
        </CardContent>
        <Button className = 'cart' variant='outlined' sx = {{width: '250px',
        margin: '1rem 0.5rem', 
        borderColor: 'black',
        height: '35px'}}
        onClick={handleAddtoCart}> <Typography variant = 'body2'>Add To Cart</Typography></Button>
    </Card>
    <div style = {{paddingTop: '2rem'}} />
    </>    
   
  )
}

export default Product