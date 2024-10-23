import React from 'react'
import d5 from "../../assets/images/d5.jpg";
import vett from "../../assets/images/vett.jpg";
import {Col, Row, Button, Card, Container, ListGroup} from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
        <Card>
            <Card.Img
              variant='top'
              src={d5}
              alt='저희 소개'/>
            <Card.Body>
              <h2 className='text-info'>저희들 소개</h2>
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
          <Card>
            <Card.Img 
              variant='top'
              src={vett}
              alt='저희들 소개' />
            <Card.Body>
              <h2 className='text-info'>서비스 주제</h2>
              <Card.Title>저희들 직무</Card.Title>
              <ListGroup variant='flush'>
                <ListGroup.Item>애완동물 건강 검진</ListGroup.Item>
                <ListGroup.Item>긴급 상황 수술</ListGroup.Item>
                <ListGroup.Item>팻 백신 주사</ListGroup.Item>
                <ListGroup.Item>치과적 치료</ListGroup.Item>
                <ListGroup.Item>Spaying and Neutering</ListGroup.Item>
                <ListGroup.Item>And many more...</ListGroup.Item>
              </ListGroup>
              <Card.Text className='mt-3'>
                From routine check-ups to emergency surgery, our full range of
                veterinary services ensures your pet's health is in good hands.
              </Card.Text>
              <Button variant='outline-info'>우리 수의사들을 만나보세요</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home
