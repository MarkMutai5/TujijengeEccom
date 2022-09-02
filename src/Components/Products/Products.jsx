import React from 'react'
import { Typography, IconButton,  Badge, Avatar, Grid } from '@material-ui/core'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import './navbar.css'
import Product from './Product/Product'

function Products({products}) {

  return (
   <>
      <div className='navbar'> 
            
            <Typography style = {{fontSize: '1.5rem', padding: '0.5rem', cursor: 'pointer'}}>
                <img src=" engineer.png" alt = ' ' height= '50rem' margin = '0.3rem'/>
                Tujijenge
            </Typography>

            <ul className='navitems'>
                <li>
                    <IconButton aria-label="cart">
                        <Badge badgeContent={4} color="secondary">
                            <AddShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                    
                </li>
                <li>
                    <Avatar sx={{ bgColor: '#e67773', width: 50, height: 50, cursor: 'pointer' }}>M</Avatar>
                </li>
            </ul>
            
        </div>
        <Grid container justifyContent = 'center' > {/*spacing = {2}*/}
          {products.map((product) => (
            <Grid item key={product.id} xs = {12} sm = {6} md = {4} lg={3}>
              <Product product = {product}/>
            </Grid>
            
            
          ))}
        </Grid>
        
    
   </>
  )
}

export default Products