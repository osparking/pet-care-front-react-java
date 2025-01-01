import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import UserProfile from "../user/UserProfile";
import { getUserById } from "../user/UserService";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

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
    const getUser = async () => {
      try {
        console.log("user ID: ", userId);
        const result = await getUserById(userId);
        setUser(result.data);
        console.log("user data: ", result.data);
      } catch (error) {
        setErrorMsg(error);
        // setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
        console.error(error.message);
      }
    };
    getUser();
  }, [userId]);

  return <Container>{user && <UserProfile user={user} />}</Container>;
};

export default UserDashboard;
