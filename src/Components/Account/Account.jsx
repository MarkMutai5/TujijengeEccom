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
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth, database } from '../config/firebaseConfig'

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

const mdTheme = createTheme();

export default function Account({uid, currentUser }) {

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [orders, setOrders] = useState([])
  const [showOrders, setShowOrders] = useState(false)

  const hanldeOrders =() => {
    setShowOrders(true)
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

  console.log(currentUser)

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

                <ListItemButton>
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
                
                <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="My reviews" />
                </ListItemButton>

                <ListItemButton>
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
          
            {showOrders && <>
                <Box sx = {{minWidth: 400,
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
                </Box>
               
                {orders.filter(order => order.UserId === uid).map(filteredOrder => (
                <>
                {filteredOrder.PhoneNumber}
                <br />
                {filteredOrder.Address}
            
                <br />
                
            </>
            ))}
            </>}
        </Box>
      </Box>
    </ThemeProvider>
  );
}

// export default function Account({uid}) {
//   return <DashboardContent />;
// }