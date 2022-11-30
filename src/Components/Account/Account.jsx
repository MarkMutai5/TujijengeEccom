// import React, {useEffect, useState} from 'react'
// import { auth, database } from '../config/firebaseConfig'

// const Account = ({uid}) => {



//   return (
//     <div>
//         {orders.filter(order => order.UserId === uid).map(filteredOrder => (
//           <>
//             {filteredOrder.PhoneNumber}
//             <br />
//             {filteredOrder.Address}
//             <br />
//           </>
//         ))}
//     </div>


//   )
// }

// export default Account
import React, {useEffect, useState} from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CardContent, ListItemButton, ListItemIcon, ListItemText, tableCellClasses, TextField, Typography } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, database } from '../config/firebaseConfig'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Button, Card, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@material-ui/core';
import { collection, onSnapshot } from 'firebase/firestore';
import Receipts from '../Receipts/Receipts';
import Setup from '../Emailsetup/Setup';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}))

const mdTheme = createTheme();

export default function Account({uid }) {

  let navigate = useNavigate()

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState(false)

  const [showAccount, setShowAccount] = useState(true)

  const [reviews, setReviews] = useState([])
  const [showReviews, setShowReviews] = useState(false)

  const [viewReceipts, setviewReceipts] = useState(false)
  const [reviewform, setreviewForm] = useState(false)

  const [users, setUsers] = useState([])


  const hanldeOrders =() => {
    setShowOrders(true)
    setShowAccount(false)
    setreviewForm(false)
    setviewReceipts(false)
    setShowReviews(false)
    auth.onAuthStateChanged(user =>{
        if(user){
        database.collection('Orders').onSnapshot(snapshot => {
            const newOrders = snapshot.docs.map((doc) => ({
            ID: doc.id,
            ...doc.data(),
            }))
            setOrders(newOrders)
        })
        }
    })
  }

  const hanldeAccount = () => {
    setShowAccount(true)
    setShowOrders(false)
    setShowReviews(false)
    setreviewForm(false)
    setviewReceipts(false)

    onSnapshot( collection(database, "Userslist"), (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({...doc.data(), UserdocId: doc.id  })))
    })
  }

  console.log(users)

  const handleReviews = () => {
    setShowReviews(true)
    setShowAccount(false)
    setShowOrders(false)
    setviewReceipts(false)
    setreviewForm(false)


    auth.onAuthStateChanged(user =>{
      if(user){
      database.collection('Reviews').onSnapshot(snapshot => {
          const newReviews = snapshot.docs.map((doc) => ({
          ID: doc.id,
          ...doc.data(),
          }))
          setReviews(newReviews)
      })
      }
  })
  }

  //console.log(reviews)
  
  const handleReceipts = () => {
    setviewReceipts(true)
    setShowReviews(false)
    setShowAccount(false)
    setShowOrders(false)
    setreviewForm(false)
  }

  const handleShowreview = () => {
    setreviewForm(true)
    setviewReceipts(false)
    setShowReviews(false)
    setShowAccount(false)
    setShowOrders(false)
  }

  const handleSignout = () => {
    toast.promise( auth.signOut().then(() => {
      navigate('/')
    }),
    {
      loading: 'Logging out...',
      success: 'User logged out',
      error: err => err.message,
    })
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
         
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">

                <ListItemButton onClick = {hanldeAccount}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="My Account" />
                </ListItemButton>

                <ListItemButton onClick = {hanldeOrders}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="My Orders" />
                </ListItemButton>
                
                <ListItemButton onClick = {handleReviews}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="My reviews" />
                </ListItemButton>

                <ListItemButton onClick = {handleSignout}>
                <ListItemIcon>
                <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
                </ListItemButton>
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

            {/* <Box sx = {{minWidth: 400,
                    width: '50%', 
                    height: 200, 
                    display: 'flex', 
                    alignItems: 'center',
                    borderRadius: 2,
                    marginTop: -3,
                    marginLeft: 3,
                    border: 1,
                    borderColor: 'blue'}}>
                         {currentUser.email}
                </Box> */}
          
            {showOrders && <>
              
              <TableContainer component = {Paper} sx = {{marginTop: '1rem', width: '70%'}}>
            <Table sx = {{minWidth: 450 }} aria-label="simple table">
              <TableHead sx= {{backgroundColor: 'lightblue'}}>
                <TableRow>
                  <StyledTableCell>Order ID</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>

              {orders.filter(order => order.UserId === uid).map(filteredOrders => (
                  <TableRow key = {filteredOrders.ID} 
                  sx = {{'&:last-child td, &:last-child th': {  border: 0 },  minHeight: '2rem'}}>
                    <TableCell component="th" scope="row">
                    {filteredOrders.ID} 
                    </TableCell>
                    <TableCell >KSH: {filteredOrders.Amount}</TableCell>
                    <TableCell >{filteredOrders.Address}</TableCell>
                    <TableCell >{filteredOrders.Status}</TableCell>
                    <TableCell >
                    <Tooltip title = 'View Receipt'>
                      <IconButton onClick = { () => handleReceipts(filteredOrders)}>
                          <ReceiptIcon />
                      </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))} 
              </TableBody>
              </Table>
              </TableContainer>
            </>}

            {showAccount  && <>
              <Box sx = {{width : '50%',
                minWidth: '500px',
                height: '50%',
                minHeight : '300px',
                border: 1,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                borderColor: 'gray',
                marginTop: -3,
                marginLeft: 3,
            }}>

                <Box sx = {{width: '50%',
                // border: 1,
                // borderColor: 'blue',
                margin: 3,
              }}>
                  <h5 style = {{paddingTop: '0.5rem', textDecoration: 'underline', textDecorationColor: 'blue'}}>Profile</h5>
                  {users.filter(user => user.UserdocId === uid).map(filteredUser => (<>
                    <Box key = {filteredUser.ID}>
                      <Box><strong>Email:</strong> <br/ >{filteredUser.Email}</Box> <br/ >
                      <Box><strong>First Name:</strong> <br/ >{filteredUser.FirstName}</Box><br/ >
                      <Box><strong>Last Name:</strong> <br/ >{filteredUser.LastName}</Box><br/ >
                      </Box>
                  </>))}
                      
                </Box>

              </Box>
            </>}

            { showReviews && <>
              <Box sx = {{width : '50%',
                minWidth: '500px',
                height: '50%',
                minHeight : '500px',
                display: 'flex',
                borderColor: 'gray',
                marginTop: -3,
                marginLeft: 3,
            }}>
              <Box sx = {{marginTop: 3,
              }}>
                
              </Box>
              <Box>
              <h5 style = {{paddingTop: '0.5rem', textDecoration: 'underline', textDecorationColor: 'blue'}}>Review and Rating</h5>
              {reviews.filter(review => review.UserId === uid).map(filteredReviews => (<>
              <Card key = {filteredReviews.ID} sx= {{marginBottom: 2}}>
                <CardContent>
                    <Typography variant = 'body1'>{filteredReviews.Review}</Typography><br />
                    <Typography variant = 'body2'>Date added: {filteredReviews.DateUploaded}</Typography><br />
                </CardContent>
              </Card>
                
              </>))}

              <Button variant = 'outlined' sx = {{margin: '1rem'}} rows = {4} onClick = {handleShowreview}>ADD REVIEW</Button>
              <Box sx = {{m:2}}>
                  {reviewform && <>
                  <Setup uid = {uid}/>
                </>}
              </Box>
             
              </Box>

              {viewReceipts && <>
              <Receipts/>
            </>}

            </Box>
            </>}

        </Box>
      </Box>
    </ThemeProvider>
  );
}