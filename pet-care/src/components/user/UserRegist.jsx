import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import ProcessSpinner from "../common/ProcessSpinner";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import VetSpecialSelector from "../veterinarians/VetSpecialSelector";

const UserRegist = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    userType: "",
    specialization: "",
  });

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const handleReset = () => {
    setUser({
      lastName: "",
      firstName: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      userType: "",
      specialization: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registUser(user);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      handleReset();
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={handleSubmit}>
            <Card className="shadow mb-5">
              <Card.Header className="text-center">
                사용자(유저) 등록
              </Card.Header>
              <Card.Body>
                <fieldset>
                  <legend>유저 성명</legend>
                  <Row>
                    <Col xs={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="(성씨)"
                        value={user.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col xs={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="(이름)"
                        value={user.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                </fieldset>
                {/* 성별 입력 */}
                <Form.Group as={Row} controlId="gender" className="mb-3">
                  <Col>
                    <Form.Label>성별</Form.Label>
                    <Form.Control
                      as="select"
                      name="gender"
                      required
                      value={user.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">(성별)</option>
                      <option value="Male">남성</option>
                      <option value="Female">여성</option>
                      <option value="Others">기타</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                {/* 연락처 두 가지 */}
                <fieldset>
                  <legend>연락처</legend>
                  <Row>
                    <Col xs={6} className="mb-2 mb-sm-0">
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="(이메일)"
                        value={user.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                    <Col xs={6}>
                      <Form.Control
                        type="text"
                        name="phone"
                        placeholder="(휴대폰 번호)"
                        value={user.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Col>
                  </Row>
                </fieldset>
                {/* 패스워드 */}
                <Form.Group as={Row} controlId="password" className="mb-3">
                  <Col>
                    <Form.Label>패스워드</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      required
                      placeholder="(비밀번호)"
                      value={user.password}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Form.Group>

                {/* 계정 유형 - 수의사, 팻 주인 */}
                <Form.Group as={Row} controlId="user-type" className="mb-3">
                  <Col>
                    <Form.Label>계정 유형</Form.Label>
                    <Form.Control
                      as="select"
                      name="userType"
                      required
                      value={user.userType}
                      onChange={handleInputChange}
                    >
                      <option value="">(계정 유형)</option>
                      <option value="VET">수의사</option>
                      <option value="PATIENT">팻 주인</option>
                    </Form.Control>
                  </Col>
                </Form.Group>
                {user.userType === "VET" && (
                  <Form.Group>
                    <Row>
                      <Col>
                        <VetSpecialSelector
                          value={user.specialization}
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                )}
                {/* 처리 버튼 */}
                <div className="d-flex justify-content-center mb-3 mt-3">
                  <Button
                    type="submit"
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <ProcessSpinner message="등록 처리 중..." />
                    ) : (
                      "등록"
                    )}
                  </Button>
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={handleReset}
                  >
                    리셋
                  </Button>
                </div>
                {/* Adjust column sizes for different screens */}
                {showErrorAlert && (
                  <AlertMessage type="danger" message={errorMessage} />
                )}
                {showSuccessAlert && (
                  <AlertMessage type="success" message={successMessage} />
                )}
                <div className="text-center">
                  이미 등록한 경우:{" "}
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    로그인
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegist;
