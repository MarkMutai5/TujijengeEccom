import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom'
import { auth, database } from '../config/firebaseConfig';
import toast from 'react-hot-toast'
import { Fade } from 'react-reveal';
import { useFormik } from 'formik';
import * as Yup from "yup";

const theme = createTheme();

export default function SignUp() {

    let navigate = useNavigate()

    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }, 
      validationSchema: Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required').min(6, 'Your password must be longer than 6 characters'),
        confirmPassword: Yup.string().required('This field is required').oneOf([Yup.ref('password')], 'Passwords do not match')
      }),
      onSubmit: values => {
        //console.log(formik.values.email);
        toast.promise(
          auth.createUserWithEmailAndPassword(formik.values.email, formik.values.password)
          .then(( cred ) => {
                database.collection('Userslist' ).doc(cred.user.uid).set({
                    FirstName: formik.values.firstName,
                    LastName: formik.values.lastName, 
                    Email: formik.values.email,
                    Password: formik.values.password
                }).then(() => navigate('/login'))}),
           {
             loading: 'Signing Up...',
             success: 'Successfully signed up',
             error: err => err.message,
           }
         )
      }
    })

  return (
    <>
    <Fade left>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  error = {Boolean(formik.touched.firstName && formik.errors.firstName)}
                  helperText = {formik.touched.firstName && formik.errors.firstName} 
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  error = {Boolean(formik.touched.lastName && formik.errors.lastName)}
                  helperText = {formik.touched.lastName && formik.errors.lastName} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  error = {Boolean(formik.touched.email && formik.errors.email)}
                  helperText = {formik.touched.email && formik.errors.email} 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  error = {Boolean(formik.touched.password && formik.errors.password)}
                  helperText = {formik.touched.password && formik.errors.password} 
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  error = {Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                  helperText = {formik.touched.confirmPassword && formik.errors.confirmPassword} 
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to = '/login' variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Fade>
    </>
  );
}