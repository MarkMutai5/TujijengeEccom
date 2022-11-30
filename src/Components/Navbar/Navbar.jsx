import React, { useState, useEffect } from 'react'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography, IconButton,  Badge, Button, Box, Menu, MenuItem, Tooltip } from '@material-ui/core'
import './navbar.css'
import { auth, database } from '../config/firebaseConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {blue} from '@mui/material/colors'

function Navbar({ currentUser}) {  

  const color = blue[700]
  const iconcolor = blue[50]

  let navigate = useNavigate()

  const options = [ 'Account', 'Logout']
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const [showaccount, setShowaccount] = useState(false)
  const [totalProducts, setTotalProducts] = useState(0)
  useEffect(() => {
  auth.onAuthStateChanged(user => {
    if(user){
      database.collection('Cart' + user.uid).onSnapshot(snapshot => {
        const quantity = snapshot.docs.length
        setTotalProducts(quantity)
      })
    }
  }) 
 
},[])


  const handleSignout = () => {
    toast.promise( auth.signOut().then(() => {
      setTotalProducts(0)
      navigate('/')
    }),
    {
      loading: 'Logging out...',
      success: 'User logged out',
      error: err => err.message,
    })
  }

  const handleAccount = () => {
    auth.onAuthStateChanged(user => {
      if(user){
        navigate('/account')
      }
      else{
        navigate('/login')
      }
    })
  }

  return (

    <>
    <Box sx={{   height: '4rem',
      width: '100%',
      backgroundColor: color,
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0 1px 2px 0 black'
  }}> 
            
            <Box style = {{ paddingLeft: '0.5rem',cursor: 'pointer'}}>
              <img src = 'TUJIJENGE.png' alt = '' height = '65px' />
            </Box>
          
                  <ul className='navitems'>

                    {!currentUser && <li>
                      <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem', color: 'white'}} onClick = {() => navigate('/login')}>LOGIN</Button>
                      </li>}

                    {/* {currentUser ? (
                      <li>
                      <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem'}} onClick = {() => handleSignout()}>LOGOUT</Button>
                    </li>
                    ) : (
                      <li>
                      <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem'}} onClick = {() => navigate('/login')}>LOGIN</Button>
                    </li>
                    )} */}
                    
                    <li>
                        <Button variant = 'outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem', color: 'white'}} onClick = {()=> navigate('/home')}>HOME</Button>
                      </li>
      
                      <li>
                      <Tooltip title="Open cart">
                          <IconButton aria-label="cart" onClick = {()=> navigate('/cart')}  sx = {{color: iconcolor}}> 
                              <Badge badgeContent={totalProducts} color="secondary" overlap="rectangular">
                                  <AddShoppingCartOutlined  />
                              </Badge>
                          </IconButton>   
                        </Tooltip> 
                      </li>

                      <li>
                        {/* <IconButton aria-label="profile" onClick = {() => setShowaccount(!showaccount)}>
                          
                        </IconButton> */}
                        <Tooltip title="Open settings">
                          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: iconcolor }}>
                            <AccountCircleIcon/>
                          </IconButton>
                        </Tooltip>
                         <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                          >
                            <MenuItem  onClick={() => {handleCloseUserMenu(); handleAccount();}}>
                                <Typography sx = {{textAlign: "center"}}>Account</Typography>
                            </MenuItem>
                            
                            <MenuItem  onClick={() => {handleCloseUserMenu(); handleSignout();}}>
                                <Typography sx = {{textAlign: "center"}}>Logout</Typography>
                            </MenuItem>
                          </Menu>
                      </li>
                     
                      
                  </ul>    
              </Box>   

              {showaccount && <h1>Profile</h1>}
    </>
  )
}

export default Navbar