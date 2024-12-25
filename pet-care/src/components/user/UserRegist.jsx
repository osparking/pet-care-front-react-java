import React from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const UserRegist = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    userType: "",
    specialty: "",
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

  const handleReset = () => {
    setUser({
      lastName: "",
      firstName: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      userType: "",
      specialty: "",
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
                    <Form.Label>Gender</Form.Label>
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
                  </Row>
                </fieldset>
              </Card.Body>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserRegist;
