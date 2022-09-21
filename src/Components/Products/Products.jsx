import React, { useContext,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, IconButton,  Badge, Grid, Button } from '@material-ui/core'
import {AddShoppingCartOutlined} from '@mui/icons-material'
import './navbar.css'
import Product from './Product/Product'
import {ProductsContext} from '../../global/ProductsContext'
import { database, auth } from '../config/firebaseConfig'


function Products() {

  const {products} = useContext(ProductsContext)
  //console.log(products)
  
  let navigate = useNavigate()

  function GetUserUid(){
    const [uid, setUid] = useState(null)
    useEffect(()=>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setUid(user.uid)
        }
      })    
    }, [])
    return uid
  }

  const uid = GetUserUid()

  let Stuff;

  const addToCart = (product) => {
    console.log(product);
    Stuff = product
    Stuff['qty'] = 1
    Stuff['TotalProductPrice'] = Stuff.qty * Stuff.ProductPrice
    database.collection('Cart' + uid).doc(product.ID).set(Stuff).then(() => {
      console.log('Added to cart');
    })
  }

  return (
   <>
      <div className='navbar'> 
            
      <Typography variant = 'h6' style = {{padding: '0.5rem', cursor: 'pointer', paddingTop: '1rem'}}>TUJIJENGE</Typography>

            <ul className='navitems'>

              <li>
                <Button variant='outlined' style = {{ paddingTop: '0.34rem', cursor: 'pointer', marginRight: '0.8rem'}} onClick = {() => navigate('/login')}>LOGIN</Button>
              </li>

                <li>
                    <IconButton aria-label="cart">
                        <Badge badgeContent={4} color="secondary">
                            <AddShoppingCartOutlined onClick = {()=> navigate('/cart')} />
                        </Badge>
                    </IconButton>    
                </li>
                
            </ul>    
        </div>   

        <Grid container justifyContent = 'center' > {/*spacing = {2}*/}
        
        {products.length === 0 && <h3>No items to be displayed</h3>}
          {products.map((product) => (
            
            <Grid item key={product.ProductId} xs = {12} sm = {6} md = {4} lg={3}> 
              <Product product = {product} addToCart = {addToCart}/>
            </Grid>
            
            
          ))}
        </Grid>
        
    
   </>
  )
}

export default Products