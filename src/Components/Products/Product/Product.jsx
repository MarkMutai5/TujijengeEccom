import {  Typography } from '@material-ui/core'
import React, { useContext } from 'react'
import './style.css'

import { CartContext } from '../../../../src/global/CartContext'
import {database } from '../../config/firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Product({product, addToCart}) {

  //const data = useContext(CartContext)
  //console.log(data);

  //const {dispatch} = useContext(CartContext)
  //() => dispatch({type: 'ADD_TO_CART', id: product.ProductId, product })

  const handleAddtoCart = () => {
    addToCart(product)
  }


  let navigate = useNavigate()

  const handleProductClick = () => {
    navigate('/extendedproduct')
   }
 

  return (
    
    <>
    
     <div className="container"  >

        <div className="media" onClick={() => handleProductClick()}>
          <img src ={product.ProductUrl} alt = ' ' height= '250px'/>
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