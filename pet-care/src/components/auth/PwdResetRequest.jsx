import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import AlertMessage from "../common/AlertMessage";

const PwdResetRequest = () => {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMsgAlerts();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    try {
      const data = await requestPasswordReset(email);
      setSuccessMsg(data.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
    setIsProcessing(false);
  };
  return (
    <Container>
      <Card>
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMsg} />
        )}
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
        <Card.Body>
          <Card.Title>패스워드 리셋 요청</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>자기의 이메일을 입력하세요</Form.Label>
              <Form.Control
                type="email"
                placeholder="-이메일 입력-"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PwdResetRequest;
