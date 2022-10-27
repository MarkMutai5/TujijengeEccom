import {  Card, CardMedia, Typography, CardContent } from '@material-ui/core'
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
        <button  className = 'cart' 
        onClick={handleAddtoCart}> <Typography variant = 'body2'>Add To Cart</Typography></button>
    </Card>
    <div style = {{paddingTop: '2rem'}} />
    </>    
   
  )
}

export default Product