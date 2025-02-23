import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import ProcessSpinner from "../common/ProcessSpinner";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import VetSpecialSelector from "../veterinarians/VetSpecialSelector";
import { registUser } from "./UserService";

const UserRegist = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    mobile: "",
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
      mobile: "",
      email: "",
      password: "",
      userType: "",
      specialization: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsProcessing(true);
      const response = await registUser(user);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      handleReset();
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const inputDefaultValues = () => {
    var local = new Date();
    var hrmnsc =
      local.getHours() + "_" + local.getMinutes() + "_" + local.getSeconds();

    setUser({
      lastName: "홍",
      firstName: "길동" + hrmnsc,
      gender: "남성",
      mobile: "010-1234-5678",
      email: `jbpark03@naver.com`, // ${hrmnsc}
      password: "1234",
      userType: "PATIENT",
      specialization: "애견치과",
    });
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
                      <option value="남성">남성</option>
                      <option value="여성">여성</option>
                      <option value="기타">기타</option>
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
                        name="mobile"
                        placeholder="(휴대폰 번호)"
                        value={user.mobile}
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
                      <ProcessSpinner message="유저 등록" />
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
                  <AlertMessage type="danger" message={errorMsg} />
                )}
                {showSuccessAlert && (
                  <>
                    <AlertMessage type="success" message={successMsg} />
                    <p>등록한 이메일로 다음 메일을 전송하였으니 자기 이메일을 인증하십시오</p>
                    <ul>
                      <li>메일 제목: 자신 이메일을 검증하세요</li>
                      <li>보낸 사람: 팻 돌봄이</li>
                      <li>중요 내용: "이메일 확인" 링크</li>
                      <li>유저 할일: 위 링크를 클락하여 자기 이메일임을 인증</li>
                    </ul>
                  </>
                )}
                <div className="text-center">
                  이미 등록한 경우:{" "}
                  <Link to={"/login"} style={{ textDecoration: "none" }}>
                    로그인
                  </Link>
                </div>
                <div className="mt-3 text-center">
                  <Button
                    variant="outline-info"
                    size="sm"
                    onClick={inputDefaultValues}
                  >
                    기본값 입력
                  </Button>
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
