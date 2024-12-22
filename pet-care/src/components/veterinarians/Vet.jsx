import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ImageUser from "../common/ImageUser";

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
          <Col>
            <ImageUser
              photoUser={vet.photo}
              altText={`${vet.lastName}${vet.firstName} 사진`}
            />
          </Col>
          <Col>
            <Link to={"/doctors"}>
              <BsFillArrowRightSquareFill>
                수의사 목록
              </BsFillArrowRightSquareFill>
            </Link>
          </Col>
        </Row>
        <Card.Body>
          <Card.Title>
            {vet.lastName}
            {vet.firstName} 수의사
          </Card.Title>
          <Card.Title>전문분야: {vet.specialization}</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Vet;
