import React, { useState } from "react";
import { Container } from "react-bootstrap";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

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
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Label></Form.Label>
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
