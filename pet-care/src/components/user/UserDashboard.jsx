import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { deleteUserPhoto } from "../modals/ImageService";
import { deleteUserAccount, getUserById } from "../user/UserService";
import UserProfile from "./UserProfile";
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

  const handleDeleteUser = async () => {
    console.log("삭제할 유저 계정 ID: ", userId);
    try {
      const result = await deleteUserAccount(userId);
      setSuccessMsg(result.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMsg(error.message);
      setShowErrorAlert(true);
      console.error(error.message);
    }
  };

  return (
    <Container>
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMsg} />
      )}
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      <Tabs>
        <Tab eventKey="profile" title={<h3>프로필</h3>}>
          {user && (
            <UserProfile
              user={user}
              handleRemovePhoto={handleRemovePhoto}
              handleDeleteUser={handleDeleteUser}
            />
          )}
        </Tab>
        <Tab eventKey="appo_status" title={<h3>예약 종합</h3>}></Tab>
        <Tab eventKey="appo_detail" title={<h3>예약 상세</h3>}></Tab>
        <Tab eventKey="review" title={<h3>리뷰</h3>}></Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
