import React, { useEffect, useState } from "react";
import { Button, Card, Container, Form, InputGroup } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { resetPassword, validateToken } from "./AuthService";
import ProcessSpinner from "../common/ProcessSpinner";

const ResetPassword = () => {
  const [newPwd, setNewPwd] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenStatus, setTokenStatus] = useState("보류");
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
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

  useEffect(() => {
    console.log("token:", token);
    if (token) {
      validateToken(token)
        .then((response) => {
          setTokenStatus(response.message);
        })
        .catch((error) => {
          setErrorMsg(error.response.data.message);
          setShowErrorAlert(true);
        });
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    try {
      const response = await resetPassword(token, newPwd);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
    setIsProcessing(false);
  };

  return (
    <Container>
      <Card style={{ maxWidth: "600px" }} className="w-100">
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMsg} />
        )}
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
        {tokenStatus === "검증된 토큰" ? (
          <Card.Body>
            <Card.Title>패스워드 재설정</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="newPwd">
                <Form.Label>새 비밀번호: </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="password"
                    value={newPwd}
                    onChange={(e) => setNewPwd(e.target.value)}
                    placeholder="(새 비밀번호)"
                  />
                </InputGroup>
              </Form.Group>
              <Button variant="outline-info" type="submit">
                {isProcessing ? (
                  <ProcessSpinner message="비밀번호 저장 중..." />
                ) : (
                  "비밀번호 재설정"
                )}
              </Button>
            </Form>
          </Card.Body>
        ) : tokenStatus === "보류" ? (
          <Card.Body>
            <ProcessSpinner message="토큰 검증 중, 기다리세요." />
          </Card.Body>
        ) : (
          <Card.Body>
            <AlertMessage type={"danger"} message="무효한 토큰입니다." />
          </Card.Body>
        )}
      </Card>
    </Container>
  );
};

export default ResetPassword;
