import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Vet = () => {
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { vetId } = useParams();
  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await getUserById(vetId);
      setVet(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [vetId]);

  if (isLoading) {
    return <h1>자료 적재 중...</h1>;
  }

  return (
    <Container>
      <Card>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
      </Card>
    </Container>
  );
};

export default Vet;
