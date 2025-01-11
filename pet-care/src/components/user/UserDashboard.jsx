import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import ApmtAccordion from "../appointment/ApmtAccordion";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { deleteUserPhoto } from "../modals/ImageService";
import Review from "../review/Review";
import { deleteUserAccount, getUserById } from "../user/UserService";
import { UserType } from "../utils/utilities";
import UserProfile from "./UserProfile";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  // const { userId } = useParams();
  const userId = 3;
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState(() => {
    const savedActiveTab = localStorage.getItem("activeTab");
    return savedActiveTab || "profile";
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

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getUserById(userId);
        setUser(result.data);
        setAppointments(result.data.appointments);
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
      <Tabs className="mb-2" justify>
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
        <Tab eventKey="appo_detail" title={<h3>예약 상세</h3>}>
          <Row>
            <Col>
              {user && (
                <React.Fragment>
                  {appointments && appointments.length > 0 ? (
                    <ApmtAccordion
                      user={user}
                      apmts={appointments}
                      isPatient={user.userType === UserType.PATIENT}
                    />
                  ) : (
                    <p>예약 건 없음</p>
                  )}
                </React.Fragment>
              )}
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="review" title={<h3>리뷰</h3>}>
          <Container className="d-flex justify-content-center align-items-center">
            <Card className="mt-5 mb-4 review-card">
              <h4 className="text-center mb-2">나의 리뷰</h4>
              <hr />
              <Row>
                <Col>
                  {user && user.reviews && user.reviews.length > 0 ? (
                    user.reviews.map((review) => (
                      <Review
                        key={review.id}
                        review={review}
                        userType={user.userType}
                      />
                    ))
                  ) : (
                    <p>등록된 리뷰가 없습니다.</p>
                  )}
                </Col>
              </Row>
            </Card>
          </Container>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
