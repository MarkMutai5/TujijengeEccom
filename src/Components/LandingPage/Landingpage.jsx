import React from 'react'
import './landingpage.css'
import {useNavigate } from 'react-router-dom'
import CarouselComponent from '../Carousel/Carousel';
import { Button, Paper, styled } from '@material-ui/core';
import { Box, Grid, IconButton } from '@mui/material';
import CarouselTestimonials from '../Carousel/CarouselTestimonials';
import WifiIcon from '@mui/icons-material/Wifi';
import ShieldIcon from '@mui/icons-material/Shield';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Landingpage() {

  let navigate = useNavigate()

  return (

    <>
      <div>

        <div className="landingcontainer" >
            
              <h1>TUJIJENGE</h1>
              <p>We help you access building materials with ease</p>
              <Button variant='contained' onClick={()=> navigate('/home')}>Shop Now</Button>

        </div>
      </div>

      <h3 style = {{paddingTop: '0.5rem', textDecoration: 'overline', textDecorationColor: 'blue'}}>ABOUT US</h3>
      <Grid container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        justifyContent = 'center'
        sx = {{margin: '2rem'}}>

        <Grid item xs={3}>
          <Item> <h5>WHO WE ARE <br />
          Tujijenge was founded on the belief that accessing building materials does not have to be hectic.
          As it is yet to be launched, we aim to break the internet with our new feat.
          </h5>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item><h5>OUR MISSION <br />
          We are driven to make construction easier for the customer by providing essential items with ease.
          </h5></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><h5>OUR STATUS <br />
          Tujijenge website is still under construction and will be available to the public soon
          </h5></Item>
        </Grid>
      </Grid>

        <CarouselComponent />

      <h3 style = {{paddingTop: '1.5rem', textDecoration: 'overline', textDecorationColor: 'green'}}>OUR FEATURES</h3>
      <Grid container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3 }} 
        justifyContent = 'center'
        sx = {{margin: '2rem'}}>

        <Grid item xs={3}>
          <Item>
            <IconButton>
            <WifiIcon/>
          </IconButton>
            <h5 style={{alignItems: 'center'}}>Easy Access. <br />
            You can easily access our services from anywhere with any device.
            </h5>
          </Item> 
        </Grid>
        <Grid item xs={3}>
          <Item>
          <IconButton>
            <LightbulbIcon/>
          </IconButton> <h5 style = {{alignItems: 'center'}}>User Friendly <br />
          Easy to navigate and use.
          </h5>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>
            <IconButton>
              <ShieldIcon />
            </IconButton><h5 style = {{alignItems: 'center'}}>Fast & Secure <br/>
            Your privacy and data is important to us.
            </h5>
            </Item> 
        </Grid>
      </Grid>

      <h3 style = {{paddingTop: '1.5rem', textDecoration: 'overline', textDecorationColor: 'red'}}>CTA</h3>
      <div className="ctatwo">
        <h5>Join Us Today</h5>
        <Button variant='contained' onClick = {() => navigate('/home')}>GET STARTED</Button>
      </div>
     
      <Box>
        <h3 style = {{paddingTop: '1.5rem', textDecoration: 'overline', textDecorationColor: 'purple'}}>TESTIMONIALS</h3>
        <CarouselTestimonials />
      </Box>
          
      <Box sx = {{width: '100%', height: '20rem', backgroundColor: 'lightblue', marginTop: '2rem'}}>

      </Box>
    </>
  )
}

export default Landingpage