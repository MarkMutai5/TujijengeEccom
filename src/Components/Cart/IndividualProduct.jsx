import { Typography } from '@material-ui/core'
import React from 'react'
import { database, auth } from '../config/firebaseConfig'
import './Individual.css'
import { IconButton } from '@mui/material'


function IndividualProduct({cartProduct}) {


  let Item

  const handleIncrease = () => {
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

  const handleDecrease = () => {
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

  const handleDelete = () => {
    Item = cartProduct
    auth.onAuthStateChanged(user =>{
      database.collection('Cart' + user.uid).doc(cartProduct.ID).delete().then(()=> {
        console.log('deleted');
      })
  })
}
  

  return (
    <div className='product'>
        <div className="image">
            <img src = {cartProduct.ProductUrl} alt = 'Product url' />
        </div>
        <br />
        <hr />
        <div className="content">

            <Typography  variant='h6'>{cartProduct.ProductName}</Typography>
            <br />

            <div className="actions">
              <IconButton onClick = {handleDecrease}>-</IconButton>
              <div>{cartProduct.qty}</div>
              <IconButton onClick = {handleIncrease}>+</IconButton>
            </div>
            
            <div>{cartProduct.TotalProductPrice}</div>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default IndividualProduct