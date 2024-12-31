import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import UserProfile from "../user/UserProfile";
import { getUserById } from "../user/UserService";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  // const { userId } = useParams();
  const userId = 1;

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

  return (
    <Container>
      <Tabs>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
