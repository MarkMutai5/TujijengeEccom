import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import {ProductsContext} from '../../global/ProductsContext'
import { database, auth } from '../config/firebaseConfig'
import 'react-toastify/dist/ReactToastify.css';
import { collection, onSnapshot } from 'firebase/firestore'
import { useEffect } from 'react'
import { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import toast from 'react-hot-toast'

function Products({uid}) {

  let navigate = useNavigate()

  // const {products} = useContext(ProductsContext)

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //https://www.youtube.com/watch?v=TkRjjq9J0tA
    getProducts()
  }, [  ])

  const getProducts = () => 
    onSnapshot( collection(database, "Products"), (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({...doc.data(), ProductId: doc.id  })))
      setLoading(false)
    }) 
    
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
        toast.success('Added to Cart')
      })
    }
    else{
      navigate('/login')
    }
    
  }
  
  return (
   <>
      {loading && ( <Spinner /> )}
        <Grid container justifyContent = 'center' > {/*spacing = {2}*/}
        
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