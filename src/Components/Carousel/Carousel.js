
import Carousel from 'react-bootstrap/Carousel';
import { Box, Button } from '@mui/material';

function CarouselComponent() {
  return (
    <Box sx={{maxWidth: "700px"}}>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="pexels-anamul-rezwan-1216589.jpg"
          alt="First slide"
          style={{borderRadius: "2ch"}}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="pexels-pixabay-271667.jpg"
        alt="Second slide"
        style={{borderRadius: "2ch"}}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="istockphoto-construction.jpg"
        alt="Third slide"
        style={{borderRadius: "2ch"}}
        />
      </Carousel.Item>
    </Carousel>  
    </Box>


  );
}

export default CarouselComponent;