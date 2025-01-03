import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { deleteUserPhoto } from "../modals/ImageService";
import UserProfile from "../user/UserProfile";
import { getUserById } from "../user/UserService";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  // const { userId } = useParams();
  const userId = 3;

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
      }
    };
    getUser();
  }, [userId]);

  const handleRemovePhoto = async () => {
    console.log("삭제할 포토 소유 유저 ID: ", userId);
    try {
      const result = await deleteUserPhoto(userId);
      window.location.reload();
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <Container>
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      {user && (
        <UserProfile user={user} handleRemovePhoto={handleRemovePhoto} />
      )}
    </Container>
  );
};

export default UserDashboard;
