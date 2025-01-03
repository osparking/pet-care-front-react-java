import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { getUserById } from "../user/UserService";

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
        <Form>
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
              </Card.Body>
            </Card>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default UserUpdate;
