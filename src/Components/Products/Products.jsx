import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import {ProductsContext} from '../../global/ProductsContext'
import { database, auth } from '../config/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css';

function Products({uid}) {

  let navigate = useNavigate()

  const {products} = useContext(ProductsContext)
  //console.log(products)

  //adding to cart
  let Stuff;
  const addToCart = (product) => {
    if (uid!==null){
      //console.log(product);
      Stuff = product
      Stuff['qty'] = 1
      Stuff['TotalProductPrice'] = Stuff.qty * Stuff.ProductPrice
      database.collection('Cart' + uid).doc(product.ProductId).set(Stuff).then(() => { //was product.ID
        //console.log('Added to cart');
      })
    }
    else{
      navigate('/login')
    }
    
  }
  
  return (
   <>
      

        <Grid container justifyContent = 'center' > {/*spacing = {2}*/}
        
        {products.length === 0 && <h5>No items to be displayed</h5>}
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