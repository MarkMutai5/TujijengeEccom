import React, { useContext,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, IconButton,  Badge, Grid, Button } from '@material-ui/core'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import './navbar.css'
import Product from './Product/Product'
import {ProductsContext} from '../../global/ProductsContext'
import { database, auth } from '../config/firebaseConfig'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Products() {

  const {products} = useContext(ProductsContext)
  //console.log(products)

  const [currentUser, setCurrentUser] = useState(null)
  
  let navigate = useNavigate()

  //getting the user id
  function GetUserUid(){
    const [uid, setUid] = useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setUid(user.uid)
          setCurrentUser(user)
        }
        else{
          setCurrentUser(null)
        }
      })    
    }, [])
    return uid
  }

  const uid = GetUserUid()


  //adding to cart
  let Stuff;
  const addToCart = (product) => {
    if (uid!==null){
      console.log(product);
      Stuff = product
      Stuff['qty'] = 1
      Stuff['TotalProductPrice'] = Stuff.qty * Stuff.ProductPrice
      database.collection('Cart' + uid).doc(product.ProductId).set(Stuff).then(() => { //was product.ID
        console.log('Added to cart');
      })
    }
    else{
      navigate('/login')
    }
    
  }

  const handleSignout = () => {
    auth.signOut()
    .then(() => {
      toast('User logged out')
    }).catch((err) => {
      toast(err.message)
    })  
  }

  //getting the length of cart items
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

  return (
   <>
      <div className='navbar'> 
            
      <Typography variant = 'h6' style = {{padding: '0.5rem', cursor: 'pointer', paddingTop: '1rem'}}>TUJIJENGE</Typography>

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
                        <Badge badgeContent={totalProducts} color="secondary">
                            <AddShoppingCartOutlined  />
                        </Badge>
                    </IconButton>    
                </li>
                
            </ul>    
        </div>   

        <ToastContainer />

        <Grid container justifyContent = 'center' > {/*spacing = {2}*/}
        
        {products.length === 0 && <h3>No items to be displayed</h3>}
          {products.map((product) => (
            
            <Grid item key={product.ProductId} xs = {12} sm = {6} md = {4} lg={3}> 
              <Product product = {product} addToCart = {addToCart} />
            </Grid>
            
            
          ))}
        </Grid>
        
    
   </>
  )
}

export default Products