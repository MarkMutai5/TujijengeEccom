
import Carousel from 'react-bootstrap/Carousel';
import { Box } from '@mui/material';

export default function CarouselTestimonials(){
  return (
    <Box sx={{maxWidth: "700px"}}>
      <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="workerone.jpg"
          alt="First slide"
          style={{borderRadius: "2ch"}}
        />
        <Carousel.Caption>
          <h3>Kevin Mutua</h3>
          <p>Tujijenge provides the best materials.</p>
        </Carousel.Caption> 
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="worker3.jpg"
        alt="Second slide"
        style={{borderRadius: "2ch"}}
        />

        <Carousel.Caption>
          <h3>Cassandra Kirei</h3>
          <p>Construction has been made a lot easier.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="worker2.jpg"
        alt="Third slide"
        style={{borderRadius: "2ch"}}
        />

        <Carousel.Caption>
          <h3>Walter Pine </h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>  
    </Box>
  );
}