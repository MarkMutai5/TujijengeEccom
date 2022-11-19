import React, {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import ReviewsIcon from '@mui/icons-material/Reviews';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Container from '@mui/material/Container';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Fade } from 'react-reveal';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { storage, database, auth } from '../config/firebaseConfig'
import { Autocomplete, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import Spinner from '../Spinner/Spinner';

const theme = createTheme();

 
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Admin() {

  let navigate = useNavigate()

  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  
  const [loading, setLoading] = useState(false)
  const [productslist, setProductsList] = useState([])
  const [viewproducts, setViewProducts] = useState(false)
  const [addproducts, setAddProducts] = useState(false)
  const [users, setUsers] = useState([])
  const [viewusers, setViewUsers] = useState(false)


  const handleAddProducts = () => {
    setAddProducts(true);
    setViewUsers(false)
    setViewProducts(false)
  }

  const handleLogOut = () => {
    toast.promise( auth.signOut().then(() => {
      navigate('/')
    }),
    {
      loading: 'Logging out...',
      success: 'Admin logged out',
      error: err => err.message,
    })
  }

  const getUsers = () => {
    setLoading(true)
    setViewUsers(true)
    setViewProducts(false)
    setAddProducts(false)

    onSnapshot( collection(database, "Userslist"), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({...doc.data(), UserId: doc.id  })))
      setLoading(false)
    })
}
// console.log(users);

  const getProductsList = () => {
    setLoading(true)
    setViewUsers(false)
    setAddProducts(false)
    setViewProducts(true)
    onSnapshot( collection(database, "Products"), (snapshot) => {
      setProductsList(snapshot.docs.map(doc => ({...doc.data(), ProductId: doc.id  })))
      setLoading(false)
  })
  }
  
  // console.log(productslist)

  const handleDeleteUser = () => {
    console.log('deleted')
  }
  const handleDeleteProduct = () => {
    console.log('deleted')
  }

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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx ={{backgroundColor: 'rgb(250, 250, 250)'}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx = {{color: 'black'}}>
           Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon >
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='My Account' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleAddProducts}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary='Add Products' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick = {getProductsList}>
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText primary='View Products' />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick = {getUsers}>
              <ListItemButton >
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary='View Users' />
              </ListItemButton>
            </ListItem>

        </List>
        <Divider />
        <List>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ReviewsIcon />
              </ListItemIcon>
              <ListItemText primary='Reviews' />
            </ListItemButton>
          </ListItem>

          <ListItem  disablePadding>
            <ListItemButton onClick = {handleLogOut}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary='Log Out' />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
       
       {loading && <Spinner/>}

       {addproducts && <>
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
       </>}

       {viewusers && <>
        <TableContainer component = {Paper} style = {{marginTop: '1rem', width: '60%'}}>
        <Table sx = {{minWidth: 450 }} aria-label="simple table">
          <TableHead sx= {{backgroundColor: 'lightblue'}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {users.map((user) => (
              <TableRow key = {user.UserId} 
              sx = {{'&:last-child td, &:last-child th': {  border: 0 },  minHeight: '2rem'}}>
                <TableCell component="th" scope="row">
                {user.FirstName + ' ' + user.LastName} 
                </TableCell>
                <TableCell >{user.Email}</TableCell>
                <TableCell >
                  <IconButton onClick = {() => handleDeleteUser()}>
                      <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
          </Table>
          </TableContainer>
       </>
       }
       
       {viewproducts && <>
        <TableContainer component = {Paper} style = {{marginTop: '1rem', width: '60%'}}>
        <Table sx = {{minWidth: 450 }} aria-label="simple table">
          <TableHead sx= {{backgroundColor: 'lightblue'}}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
             {productslist.map((item) => (
              <TableRow key = {item.ProductId} 
              sx = {{'&:last-child td, &:last-child th': {  border: 0 },  minHeight: '2rem'}}>
                <TableCell component="th" scope="row">
                {item.ProductName} 
                </TableCell>
                <TableCell >{item.ProductPrice}</TableCell>
                <TableCell >{item.ProductCategory}</TableCell>
                <TableCell >
                  <IconButton onClick = {() => handleDeleteProduct()}>
                      <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
          </Table>
          </TableContainer>
       </>}
       
      </Main>
    </Box>
  );
}
