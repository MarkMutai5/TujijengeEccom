import { Button, Typography } from '@mui/material'
import React, {useState} from 'react'
import Main from '../AddProduct/Main'

function Admin() {

  const [addProducts, setAddProducts] = useState(false)

  const handleAddProducts = (e) => {
    e.preventDefault()
    console.log('clicked');
    setAddProducts(true)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    console.log('clicked');
    setAddProducts(false)
  }

  return (
    <>
      <Typography variant = 'body2'>This is the admin page</Typography>  
      <Button variant = 'filled' onClick = { handleAddProducts}>Add products</Button>
      <Button onClick={handleCancel}>Cancel</Button>
      {addProducts ? <Main /> : <div></div> }
    </>
  )
}

export default Admin