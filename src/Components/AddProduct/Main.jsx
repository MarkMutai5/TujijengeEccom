
import React, { useState } from 'react'
import './style.css'

import {database, storage} from '../config/firebaseConfig'

function Main() {

    const [productName, setProductName] = useState(' ')
    const [productPrice, setProductPrice] = useState(0)
    const [productDescription, setProductDescription] = useState(' ')
    const [productImg, setProductImg] = useState(' ')
    const [error, setError] = useState(' ')


    const types = ['image/png', 'image/jpg', 'image/jpeg']
    const productImageHandler = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile)
            setError(' ')
        }
        else{
            setProductImg(null)
            setError(' Enter valid file type')
        }
    }


    const addProduct = (e) => {
        e.preventDefault()
        //console.log(productName, productDescription, productPrice, productImg)
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg)
        uploadTask.on('state_changed', snapshot=> {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log(progress)
        }, err=> {
            setError( err.message)
        }, () => {
            storage.ref('product-images').child(productImg.name).getDownloadURL().then(url =>{
                database.collection('Products').add({
                    ProductName: productName,
                    ProductPrice: Number (productPrice),
                    Description: productDescription,
                    ProductUrl: url
                }).then(()=> {
                    setProductName('')
                    setProductPrice(0)
                    setProductDescription('')
                    setProductImg('')
                    setError('')
                    document.getElementById('file').value = ' '
                }).catch(err=> setError(err.message) )
            })
        })
    }

  return (
    <>
        <div className="form">
            <h2>ADD PRODUCTS</h2>
            <form autoComplete='off' onSubmit={addProduct}>

                <label htmlFor='product-name'> Product Name </label>               
                <br />
                <input type="text" placeholder='Product name' required
                onChange={(e) => setProductName(e.target.value)} value = {productName} />
                <br />


                <label htmlFor = 'product-price' > Price:  </label>          
                <br />
                <input type="number" placeholder='Price' required 
                onChange={(e) => setProductPrice(e.target.value)} value = {productPrice} />
                <br />


                <label htmlFor='product-description' > Description: </label>
                <br />
                <input type="text" placeholder='Product description' required 
                onChange={(e) => setProductDescription(e.target.value)} value = {productDescription} />
               <br />


               <label htmlFor='image'>Image:</label>
               <br />
               <input type = 'file' onChange={productImageHandler} id = 'file'/>
               <br />

                <button type = 'submit' > ADD </button>

            </form>

            {error && <span>{error}</span>}
            
        </div>
    </>
  )
}

export default Main