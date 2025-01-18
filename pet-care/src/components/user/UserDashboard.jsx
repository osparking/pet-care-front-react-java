import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import ApmtAccordion from "../appointment/ApmtAccordion";
import CustomPie from "../charts/CustomPie";
import AlertMessage from "../common/AlertMessage";
import NoDataAvailable from "../common/NoDataAvailable";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { deleteUserPhoto } from "../modals/ImageService";
import Review from "../review/Review";
import { deleteUserAccount, getUserById } from "../user/UserService";
import { UserType } from "../utils/utilities";
import UserProfile from "./UserProfile";
import { useParams } from "react-router-dom";
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState(() => {
    const savedActiveTab = localStorage.getItem("activeTab");
    return savedActiveTab || "profile";
  });
  const [appoChartData, setAppoChartData] = useState([]);
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
  }, []);

  const frequencies = (arr) =>
    arr.reduce((a, v) => {
      a[v] = (a[v] ?? 0) + 1;
      return a;
    }, {});

  useEffect(() => {
    if (user && user.appointments) {
      const result = frequencies(appointments.map((appo) => appo.status));
      const statusCountArr = Object.entries(result).map(([status, count]) => ({
        name: status,
        value: count,
      }));
      setAppoChartData(statusCountArr);
      setAppointments(user.appointments);
      console.log("예약 차트 자료: ", statusCountArr);
    }
  }, [user]);

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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <Container>
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMsg} />
      )}
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      <Tabs
        className="mb-2"
        justify
        activeKey={activeTab}
        onSelect={handleTabChange}
      >
        <Tab eventKey="profile" title={<h3>프로필</h3>}>
          {user && (
            <UserProfile
              user={user}
              handleRemovePhoto={handleRemovePhoto}
              handleDeleteUser={handleDeleteUser}
            />
          )}
        </Tab>
        <Tab eventKey="appo_status" title={<h3>예약 통계</h3>}>
          <Row>
            <Col>
              <h5 className="mb-4 chart-title">예약 상태 통계</h5>
              {appoChartData && appoChartData.length > 0 ? (
                <CustomPie data={appoChartData} />
              ) : (
                <NoDataAvailable
                  dataType={"진료 예약 자료"}
                  errorMessage={"맨 처음 예약을 해 보세요."}
                />
              )}
            </Col>
          </Row>
        </Tab>
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
                    <NoDataAvailable
                      dataType={"진료 예약 자료"}
                      errorMessage={"등록된 예약 기록이 없습니다."}
                    />
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
                    <NoDataAvailable
                      dataType={"진료 경험 리뷰"}
                      errorMessage={"등록된 리뷰가 없습니다."}
                    />
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
