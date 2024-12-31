import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

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
        const result = await getUserById(userId);
        setUser(result.data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
        console.error(error.message);
      }
    };
  }, []);

  return (
    <Container>
      <Tabs>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
        <Tab></Tab>
        <Tab></Tab>
        <Tab></Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
