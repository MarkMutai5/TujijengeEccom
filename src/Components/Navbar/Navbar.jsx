import React, { useState, useEffect } from 'react'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import { Typography, IconButton,  Badge, Button, Box } from '@material-ui/core'
import './navbar.css'
import { auth, database } from '../config/firebaseConfig';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar({uid}) {  

  let navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null)
 
  //getting the user id
  
    useEffect(()=>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setCurrentUser(user)
        }
        else{
         setCurrentUser(null)
        }
      })    
    }, [])
  

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
      navigate('/home')
    }),
    {
      loading: 'Logging out...',
      success: 'User logged out',
      error: err => err.message,
    })
  }

  return (

    <>
    <Box sx={{   height: '4rem',
      width: '100%',
      backgroundColor: '#fafafa',
      display: 'flex',
      justifyContent: 'space-between',
      boxShadow: '0 1px 2px 0 black'
  }}> 
            
            <Typography variant = 'h6' style = {{padding: '0.5rem', cursor: 'pointer', paddingTop: '1rem'}} onClick = {()=> navigate('/home')}>TUJIJENGE</Typography>
          
                  <ul className='navitems'>

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
              </Box>   
    </>
  )
}

export default Navbar