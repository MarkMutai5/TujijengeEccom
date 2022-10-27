import React from 'react'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { Typography, IconButton,  Badge, Button, TextField } from '@material-ui/core'
import './navbar.css'

function Navbar( {currentUser, navigate, totalProducts, handleSignout}) {  

  return (
    <>
    <div className='navbar'> 
            
            <Typography variant = 'h6' style = {{padding: '0.5rem', cursor: 'pointer', paddingTop: '1rem'}} onClick = {()=> navigate('/home')}>TUJIJENGE</Typography>
          
                  <ul className='navitems'>
                    
                    {/* {<TextField 
                    style = {{height: '3rem'}}
                      InputProps = {{
                        startAdornment :
                            <InputAdornment position='start'>
                              <SearchIcon />
                            </InputAdornment>,
                      }}
                      variant = 'outlined'
                      
                    />} */}
                    

                    {currentUser ? (
                      <li>
                      <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem'}} onClick = {() => handleSignout()}>LOGOUT</Button>
                    </li>
                    ) : (
                      <li>
                      <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem'}} onClick = {() => navigate('/login')}>LOGIN</Button>
                    </li>
                    )}
                    
      
                      <li>
                          <IconButton aria-label="cart" onClick = {()=> navigate('/cart')}> 
                              <Badge badgeContent={totalProducts} color="secondary" overlap="rectangular">
                                  <AddShoppingCartOutlined  />
                              </Badge>
                          </IconButton>    
                      </li>
                      
                  </ul>    
              </div>   
    </>
  )
}

export default Navbar