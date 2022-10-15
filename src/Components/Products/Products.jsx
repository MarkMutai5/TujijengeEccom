import React, { useContext,useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'
import {ProductsContext} from '../../global/ProductsContext'
import { database, auth } from '../config/firebaseConfig'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Navbar/Navbar'

function Products() {

  let navigate = useNavigate()

  

  const {products} = useContext(ProductsContext)
  //console.log(products)

  const [currentUser, setCurrentUser] = useState(null)
 
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
  auth.signOut()
  .then(() => {
    toast.success('User logged out')
  }).catch((err) => {
    toast(err.message)
  })  
}

  
  return (
   <>
      
        <Navbar currentUser = {currentUser} navigate = {navigate} totalProducts = {totalProducts} handleSignout = {handleSignout}/>

        

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