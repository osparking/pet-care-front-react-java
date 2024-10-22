import React from 'react'
import d5 from "../../assets/images/d5.jpg";
import vett from "../../assets/images/vett.jpg";
import {Col, Row, Button, Card, Container} from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
        <Card>
            <Card.Img
              variant='top'
              src={d5}
              alt='우리 소개'/>
            <Card.Body>
              <Card.Title>당신의 털복숭이 친구를 친절히 보살펴요</Card.Title>
              <Card.Text>
                At Universal Pet Care, we believe every pet deserves the best.
                Our team of dedicated professionals is here to ensure your pet's
                health and happiness through comprehensive veterinary services.
                With decades of combined experience, our veterinarians and
                support staff are committed to providing personalized care
                tailored to the unique needs of each pet.
              </Card.Text>
              <Card.Text>
                We offer a wide range of services, from preventive care and
                routine check-ups to advanced surgical procedures and emergency
                care. Our state-of-the-art facility is equipped with the latest
                in veterinary technology, which allows us to deliver
                high-quality care with precision and compassion. 
              </Card.Text>
              <Button variant='outline-info'>우리 수의사들을 만나보세요</Button>
            </Card.Body>
          </Card>        
        </Col>
        <Col>
        </Col>
      </Row>
    </Container>
  );
}

export default Home
