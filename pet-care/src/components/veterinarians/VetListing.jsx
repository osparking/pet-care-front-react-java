import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoadingSpinner from "../common/LoadingSpinner";
import NoDataAvailable from "../common/NoDataAvailable";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import VetCard from "./VetCard";
import VetSearch from "./VetSearch";
import { getVets } from "./VetService";

const VetListing = () => {
  const [vets, setVets] = useState([]);
  const [allVets, setAllVets] = useState([]);
  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getVets()
      .then((data) => {
        setVets(data.data);
        setAllVets(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
      });
  }, []);

  const handleSearchResult = (foundVets) => {
    setShowErrorAlert(false);
    if (foundVets === null) {
      setVets(allVets);
    } else {
      setVets(foundVets);
    }
  };

  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section>
      {vets && vets.length > 0 ? (
        <React.Fragment>
          <Container>
            <Row className="justify-content-center">
              <h2 className="text-center mb-4 mt-4">
                저희 수의사를 만나보세요
              </h2>
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
        </React.Fragment>
      ) : (
        <NoDataAvailable
          dataType={" 등록된 수의사 자료 "}
          errorMessage={errorMsg}
        />
      )}
    </section>
  );
};

export default VetListing;
