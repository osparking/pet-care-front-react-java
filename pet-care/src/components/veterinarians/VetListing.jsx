import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import VetCard from "./VetCard";
import { getVets } from "./VetService";

const VetListing = () => {
  const [vets, setVets] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getVets()
      .then((data) => {
        setVets(data.data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  if (vets.length === 0) {
    return <p>저희는 현재 수의사가 없습니다.</p>;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="text-center mb-4 mt-4">저희 수의사를 만나보세요</h2>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <Row>
            <h5>여기서 검색하세요</h5>
          </Row>
        </Col>
        <Col>
          {vets.map((vet, index) => (
            <VetCard key={index} vet={vet} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default VetListing;
