import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import ProcessSpinner from "../common/ProcessSpinner";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { requestPasswordReset } from "./AuthService";

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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <Card style={{ maxWidth: "600px" }} className="w-100">
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
              <Form.Text className="text-muted">
                이메일로 비밀번호 초기화 링크가 전송됩니다.
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-info">
              {/* className="w-100">  */}
              {isProcessing ? (
                <ProcessSpinner message="검증 이메일 전송 중..." />
              ) : (
                "이메일 전송 요청"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PwdResetRequest;
