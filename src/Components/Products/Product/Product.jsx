import {  Typography } from '@material-ui/core'
import { AddShoppingCartOutlined } from '@mui/icons-material'
import React, { useContext } from 'react'
import { CartContext } from '../../../../src/global/CartContext'
import './style.css'
import {database } from '../../config/firebaseConfig'

function Product({product, addToCart}) {

  //const data = useContext(CartContext)
  //console.log(data);

  //const {dispatch} = useContext(CartContext)
  //() => dispatch({type: 'ADD_TO_CART', id: product.ProductId, product })

  const handleAddtoCart = () => {
    addToCart(product)
  }

  return (
    
    <>
    
     <div className="container"  >
        <div className="media">
          <img src ={product.ProductUrl} alt = ' ' width= '240px'  />
        </div>
        <hr />
       <div className="content">
          <Typography variant='h6'> {product.ProductName}</Typography>
          <Typography variant='body1' gutterBottom> Ksh {product.ProductPrice}</Typography>
       </div>
       <div className="description">
          <Typography variant='body1'> {product.Description}</Typography>
       </div>

        <button  className = 'cart' 
        onClick={handleAddtoCart}>Add To Cart</button>
     
    </div>
    </>    
   
  )
}

export default Product