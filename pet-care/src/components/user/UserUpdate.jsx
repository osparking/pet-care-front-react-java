import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { getUserById } from "../user/UserService";
import VetSpecialSelector from "../veterinarians/VetSpecialSelector";

const UserUpdate = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    mobile: "",
    specialization: "",
    email: "",
    userType: "",
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

  const [isProcessing, setIsProcessing] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("user ID: ", userId);
        const result = await getUserById(userId);
        setUser(result.data);
        console.log("user data: ", result.data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
      }
    };
    getUser();
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedUser = {
      lastName: user.lastName,
      firstName: user.firstName,
      gender: user.gender,
      mobile: user.mobile,
      specialization: user.specialization,
      email: user.email,
      userType: user.userType,
    };

    try {
      setIsProcessing(true);
      const response = await updateUser(userId, updatedUser);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const { navigate } = useNavigate();

  const handleCancelUpdate = () => {
    navigate(`/user_dashboard/${userId}/my_dashboard`);
  };

  return (
    <Container>
      <div>
        <Form onSubmit={handleUpdate}>
          <div>
            <Card>
              <Card.Header></Card.Header>
              <Card.Body>
                <fieldset className="field-set">
                  <legend>성명</legend>
                  <Form.Group
                    as={Col}
                    controlId="nameFields"
                    className="mb-2 d-flex"
                  >
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="(성씨)"
                      value={user.lastName}
                      onChange={handleInputChange}
                    />
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="(이름)"
                      value={user.firstName}
                      onChange={handleInputChange}
                      style={{ marginRight: "10px" }}
                    />
                  </Form.Group>
                </fieldset>
                {/* 성별 입력 */}
                <Form.Group as={Row} controlId="gender" className="mb-3">
                  <Form.Label>성별</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    required
                    value={user.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">(성별)</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="Others">기타</option>
                  </Form.Control>
                </Form.Group>
                {/* 계정 유형 - 비활성 */}
                <Form.Group as={Col} controlId="user-type" className="mb-2">
                  <Form.Label className="legend">계정 유형</Form.Label>
                  <Form.Control
                    type="text"
                    name="userType"
                    value={user.userType}
                    onChange={handleInputChange}
                    disabled
                  />
                </Form.Group>

                {/* 연락처 두 가지 */}
                <fieldset className="field-set mb-2 mt-2">
                  <legend>연락처</legend>
                  <Form.Group
                    as={Col}
                    controlId="emailMobileFields"
                    className="mb-2 d-flex"
                  >
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="(이메일)"
                      value={user.email}
                      disabled
                    />
                    <Form.Control
                      type="text"
                      name="mobile"
                      placeholder="(휴대폰 번호)"
                      value={user.mobile}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </fieldset>

                {user.userType === "VET" && (
                  <Form.Group controlId="specialization" className="mb-4">
                    <Form.Label className="legend">전문분야</Form.Label>
                    <VetSpecialSelector
                      handleAddSpecial={handleAddSpecial}
                      user={user}
                      setUser={setUser}
                    />
                  </Form.Group>
                )}

                <div className="d-flex justify-content-center">
                  <div className="mx-2">
                    <Button
                      type="submit"
                      variant="outline-warning"
                      size="sm"
                      className="me-2"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <ProcessSpinner message="갱신 처리 중..." />
                      ) : (
                        "갱신"
                      )}
                    </Button>
                  </div>
                  <div className="mx-2">
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={handleCancelUpdate}
                    >
                      프로필로 복귀
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserUpdate;
