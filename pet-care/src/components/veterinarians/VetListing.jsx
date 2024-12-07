import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import VetCard from "./VetCard";
import VetSearch from "./VetSearch";
import { getVets } from "./VetService";

const VetListing = () => {
  const [vets, setVets] = useState([]);
  const [allVets, setAllVets] = useState([]);
  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  useEffect(() => {
    getVets()
      .then((data) => {
        setVets(data.data);
        setAllVets(data.data);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
      });
  }, []);

  if (vets.length === 0) {
    return showErrorAlert ? (
      <AlertMessage type={"danger"} message={errorMsg} />
    ) : (
      <p>저희는 현재 수의사가 없습니다.</p>
    );
  }

  const handleSearchResult = (foundVets) => {
    setShowErrorAlert(false);
    if (foundVets === null) {
      setVets(allVets);
    } else {
      setVets(foundVets);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <h2 className="text-center mb-4 mt-4">저희 수의사를 만나보세요</h2>
      </Row>
      <Row className="justify-content-center">
        <Col md={4}>
          <VetSearch onSearchResult={handleSearchResult} />
        </Col>
        <Col md={7}>
          {vets.map((vet, index) => (
            <VetCard key={index} vet={vet} />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default VetListing;
