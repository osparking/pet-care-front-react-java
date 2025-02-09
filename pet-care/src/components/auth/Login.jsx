import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { BsLockFill, BsPersonFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { userLogin } from "./AuthService";
import {jwtDecode} from "jwt-decode"

const Login = () => {
  const [creden, setCreden] = useState({
    email: "jbpark03@gmail.com",
    password: "1234",
  });

  const handleInputChange = (e) => {
    setCreden({ ...creden, [e.target.name]: e.target.value });
  };

  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!creden.email || !creden.password) {
      setErrorMsg("아이디/비밀번호를 입력하세요.");
      setShowErrorAlert(true);
      return;
    }
    try {
      const data = await userLogin(creden.email, creden.password);
      localStorage.setItem("authToken", data.token);
      const tokenDecoded = jwtDecode(data.token);
      localStorage.setItem("userRoles", JSON.stringify(tokenDecoded.roles));
      localStorage.setItem("userId", JSON.stringify(tokenDecoded.id));
      
      clearForm();
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMsg(error.response.data.data);
      setShowErrorAlert(true);
    }
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authToken");
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, []);

  const clearForm = () => {
    setCreden({ email: "", password: "" });
    setShowErrorAlert(false);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card>
            {showErrorAlert && (
              <AlertMessage type={"danger"} message={errorMsg} />
            )}
            <Card.Body>
              <Card.Title className="text-center mb-4"></Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>이메일</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsPersonFill />
                    </InputGroup.Text>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="(이메일)"
                      value={creden.email}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>비밀번호</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <BsLockFill />
                    </InputGroup.Text>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="(비밀번호)"
                      value={creden.password}
                      onChange={handleInputChange}
                    />
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="submit"
                  className="w-100"
                >
                  로그인
                </Button>
              </Form>
              <div className="text-center mt-2">
                아직 등록하지 않았음:{" "}
                <Link to={"/register-user"} style={{ textDecoration: "none" }}>
                  계정 등록
                </Link>{" "}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
