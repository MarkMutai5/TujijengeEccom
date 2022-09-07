{/* Commented out incase productscontext doesnt work 
...was planning on moving the entire thing to products component


import React, { useState, useEffect } from 'react'
import {database} from './Components/config/firebaseConfig'


function FirebaseExtraction() {

    const [products, setProducts] = useState([ ])


    useEffect(() => {
      //https://www.youtube.com/watch?v=TkRjjq9J0tA
      getProducts()
    }, [  ])

    const getProducts = () => {
      database.collection('Products')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          setProducts((prev) =>{
            return[...prev, doc.data()]
          })
        })
      })
      
      console.log(products)
    }
    

  return (
    <>
      <h1>Firestore</h1>
    </>
  )
}

export default FirebaseExtraction
*/}
