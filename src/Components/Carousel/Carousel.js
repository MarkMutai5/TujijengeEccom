
import Carousel from 'react-bootstrap/Carousel';
import { Box } from '@mui/material';

function CarouselComponent() {
  return (
    <Box sx={{maxWidth: "700px"}}>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="TUJIJENGE.png"
          alt="First slide"
          style={{borderRadius: "2ch"}}
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="construction3 images.jpeg"
        alt="Second slide"
        style={{borderRadius: "2ch"}}
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="istockphoto-construction.jpg"
        alt="Third slide"
        style={{borderRadius: "2ch"}}
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>  
    </Box>


  );
}

export default CarouselComponent;