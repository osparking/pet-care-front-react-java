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
            
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PwdResetRequest;
