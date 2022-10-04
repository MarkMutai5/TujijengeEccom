
import React, { useState } from 'react'
import './style.css'

import {database, storage} from '../config/firebaseConfig'
import { TextField } from '@mui/material'

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
            setError('')
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
                    document.getElementById('file').defaultValue = ''  //was .value
                }).catch(err=> setError(err.message) )
            })
        })
    }

  return (
    <>
        <div className="addproducts">
            <h2>ADD PRODUCTS</h2>
            <form autoComplete='off' onSubmit={addProduct}>

                              
                <br />
                <TextField sx={{ m: 1, width: '50rem' }} type="text" label='Product name' variant = 'outlined' required
                onChange={(e) => setProductName(e.target.value)} value = {productName} />
                <br />


                        
                <br />
                <TextField sx={{ m: 1, width: '50rem' }} type="number" label='Price' variant = 'outlined' required 
                onChange={(e) => setProductPrice(e.target.value)} value = {productPrice} />
                <br />


                
                <br />
                <TextField sx={{ m: 1, width: '50rem' }} type="text" label='Product description' variant = 'outlined' required 
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