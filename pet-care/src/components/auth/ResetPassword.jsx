import React, { useState } from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import AlertMessage from "../common/AlertMessage";

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
  }

  return (
    <Container>
      <Card style={{ maxWidth: "600px" }} className="w-100">
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMsg} />
        )}
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
        {tokenStatus === "정당" ? (
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
            </Form>
          </Card.Body>
        ) : (
          ""
        )}
      </Card>
    </Container>
  );
};

export default ResetPassword;
