import { Typography, Card, CardMedia, CardContent } from '@material-ui/core'
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
    <>
    

    <div />
    <Card style={{maxWidth: '280px'}} >
        <CardMedia image = {cartProduct.ProductUrl} title = {cartProduct.ProductName} className = 'media' style ={{margin: '0.5rem'}}/>
        <CardContent >
          <div className='cardcontent'>
            <Typography gutterBottom variant ='body1'>
              {cartProduct.ProductName}
            </Typography> 

            <div className="actions">
              <IconButton onClick = {handleDecrease}>-</IconButton>
              <div>{cartProduct.qty}</div>
              <IconButton onClick = {handleIncrease}>+</IconButton>
              <Typography variant = 'body1'>
              KSH{cartProduct.TotalProductPrice}
            </Typography>
            </div>

          </div>
          <button onClick={handleDelete} className = 'btnCart'>DELETE</button>
        </CardContent>
    </Card>
    <div style = {{paddingTop: '2rem'}} />
    </>
  )
}

export default IndividualProduct