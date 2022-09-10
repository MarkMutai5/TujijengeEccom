{/*Commented out incase productscontext doesnt work 
...was planning on moving the entire thing to products component


import React, { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import {database} from '../Components/config/firebaseConfig'


function FirebaseExtraction() {

    const [products, setProducts] = useState([ ])


    useEffect(() => {
      //https://www.youtube.com/watch?v=TkRjjq9J0tA
      getProducts()
    }, [  ])

    const getProducts = () => 
      onSnapshot( collection(database, "Products"), (snapshot) => {
        setProducts(snapshot.docs.map(doc => ({...doc.data(), Id: doc.id  })));
      } )
      
       console.log(products) 
    
    

  return (
    <>
      <h1>Firestore</h1>
    </>
  )
}

export default FirebaseExtraction

*/}