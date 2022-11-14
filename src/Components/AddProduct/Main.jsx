

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fade } from 'react-reveal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { storage, database } from '../config/firebaseConfig'
import { Autocomplete } from '@mui/material';
import toast from 'react-hot-toast';

const theme = createTheme();

export default function Main() {

  const categories = ['Cement', 'Glass', 'PVC', 'Iron Sheets', ]

  const formik = useFormik({
    initialValues: {
        productName: "",
        productCategory: "",
        productDesc: "",
        price: "",
        productimage: ""
    },
    validationSchema: Yup.object({
        productName: Yup.string().required('Product Name is required'),
        productDesc: Yup.string().required('Product Description is required'),
        productCategory: Yup.string().required('Product Category is required'),
        price: Yup.string().required('Price is required'),
        productimage: Yup.mixed().required('Image is required'),
    }),
    onSubmit : (values, onSubmitProps) => {
      //console.log(formik.values)
      const uploadTask = storage.ref(`Product-Images/${formik.values.productimage.name}`).put(formik.values.productimage)
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        //console.log(progress)
        }, err => {
        toast.error(err.message)
      }, () => {
        toast.promise(
          storage.ref('Product-Images').child(formik.values.productimage.name).getDownloadURL().then(url => {
              database.collection('Products').add({
                ProductName: formik.values.productName,
                ProductCategory: formik.values.productCategory,
                ProductPrice: formik.values.price,
                Description: formik.values.productDesc,
                ProductUrl : url
              }).then(() => {
                onSubmitProps.resetForm()
              })})
          ,
           {
             loading: 'Adding Product...',
             success: 'Product Added',
             error: err => err.message,
           });
      })  
    }
  })


  return (
    <>
    <Fade right>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <NoteAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Add Products
          </Typography>
          <Box component="form" onSubmit={ formik.handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoComplete="productName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productName}
              error = {Boolean(formik.touched.productName && formik.errors.productName)}
              helperText = {formik.touched.productName && formik.errors.productName} 
              
            />
            <Autocomplete
              disablePortal                
              fullWidth
              options={categories}              
              onChange={(event, value) => formik.setFieldValue("productCategory", value || "" )}
              renderInput={(params) => 
                <TextField {...params}  
                  margin="normal" 
                  label="Product Category"
                  id="category"
                  required
                  name="productCategory"
                  onBlur={formik.handleBlur}
                  value={formik.values.productCategory}
                  error = {Boolean(formik.touched.productCategory && formik.errors.productCategory)}
                  helperText = {formik.touched.productCategory && formik.errors.productCategory} 
              />}
            />
            
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Product Description"
              name="productDesc"
              autoComplete="productDesc"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.productDesc}
              error = {Boolean(formik.touched.productDesc && formik.errors.productDesc)}
              helperText = {formik.touched.productDesc && formik.errors.productDesc} 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              id="price"
              autoComplete="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.price}
              error = {Boolean(formik.touched.price && formik.errors.price)}
              helperText = {formik.touched.price && formik.errors.price} 
            />
            <input 
              name = 'productImage'
              type= 'file'
              onChange={(e) => formik.setFieldValue("productimage", e.target.files[0])}
              />
            {/* <TextField
              margin="normal"
              required
              fullWidth
              name="productimage"
              type='file'
              id="productimage"
              onChange={(e) => setFieldValue("productimage", e.target.files[0])
              }
              onBlur={formik.handleBlur}
              value={formik.values.productimage}
              error = {Boolean(formik.touched.productimage && formik.errors.productimage)}
              helperText = {formik.touched.productimage && formik.errors.productimage} 
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Add 
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Fade>
    </>
  );
}