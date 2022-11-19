import * as React from 'react';
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
import { Fade } from 'react-reveal';
import { Link, useNavigate} from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from "yup";
import toast from 'react-hot-toast';
import { auth } from '../config/firebaseConfig';
import { useEffect } from 'react';


const theme = createTheme();

export default function Login() {

  let navigate = useNavigate()

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if(user){
  //       navigate('/home')
  //       toast.error('User is already logged in')
  //     }
  //   })
  
  // }, [])

 
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required').min(6, 'Your password must be longer than 6 characters'),
    }),
    onSubmit: values => {
      //console.log(`email: ${formik.values.email} and password is ${formik.values.password}`);
      toast.promise(
        auth.signInWithEmailAndPassword(formik.values.email, formik.values.password).then(()=>  navigate('/home')),
         {
           loading: 'Signing in...',
           success: 'Successfully logged in',
           error: err => err.message,
         }
       );
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={ formik.handleSubmit}  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error = {Boolean(formik.touched.email && formik.errors.email)}
              helperText = {formik.touched.email && formik.errors.email} 
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error = {Boolean(formik.touched.password && formik.errors.password)}
              helperText = {formik.touched.password && formik.errors.password} 
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to = '/signup' variant="body2" sx = {{ cursor: 'pointer'}}>
                  {"Don't have an account? Sign Up"}
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