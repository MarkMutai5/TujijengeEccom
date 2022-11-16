import React from 'react'
import './landingpage.css'
import {useNavigate } from 'react-router-dom'
import CarouselComponent from '../Carousel/Carousel';
import { Button } from '@material-ui/core';

function Landingpage() {

  let navigate = useNavigate()

  return (

    <>
      <div>

        <div className="landingcontainer" >
            
              <h1>TUJIJENGE</h1>
              <p>We help you access building materials with ease</p>
              <Button variant='outlined' onClick={()=> navigate('/home')}>Shop Now</Button>

        </div>

        <div className="details">
            <div>
                <h1>Here are some benefits of shopping with us</h1>
            </div>
        </div>

      </div>

        <CarouselComponent />

    <div className='landingfooter'>
      <h1>TUJIJENGE: WE MAKE CONSTRUCTION EASIER FOR YOU</h1>
      <div className="footercontainer">
        <div className="row">

          <div className="column">
            <div className="heading">About Us </div>
              <p>Aim</p>
              <p>Vision</p>
              <p>Testimonial</p>
          </div>

          <div className="column">
            <div className="heading">Social Media</div>
              <p>Github</p>
              <p>LinkedIn</p>
              <p>Twitter</p>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Landingpage