import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageUser from "../common/ImageUser";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ImageUpModal from "../modals/ImageUpModal";

const UserProfile = ({ user, handleRemovePhoto }) => {
  const [showImageUpModal, setShowImageUpModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleShowImageUpModal = () => setShowImageUpModal(true);
  const handleCloseImageUpModal = () => setShowImageUpModal(false);
  const handleShowChangePasswordModal = () => setShowChangePasswordModal(true);
  const handleCloseChangePasswordModal = () =>
    setShowChangePasswordModal(false);

  return (
    <React.Fragment>
      <Row>
        <Col md={3}>
          <Card className="text-center mb-3 shadow">
            <Card.Body>
              <ImageUser photoUser={user.photo} />
            </Card.Body>
            <div className="text-center">
              <p>
                {" "}
                <Link to={"#"} onClick={handleShowImageUpModal}>
                  사진 변경
                </Link>
              </p>
              <ImageUpModal
                userId={user.id}
                show={showImageUpModal}
                handleClose={handleCloseImageUpModal}
              />
              <p>
                {" "}
                {user.photo ? (
                  <Link to={"#"} onClick={handleRemovePhoto}>
                    사진 제거
                  </Link>
                ) : (
                  <Link to={"#"} style={{ cursor: "default", color: "grey" }}>
                    사진 제거
                  </Link>
                )}
              </p>
              <Link to={"#"} onClick={handleShowChangePasswordModal}>
                비밀번호 변경
              </Link>
              <ChangePasswordModal
                userId={user.id}
                show={showChangePasswordModal}
                handleClose={handleCloseChangePasswordModal}
              />
            </div>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>성씨 :</Col>
              <Col md={4}>
                <Card.Text>{user.lastName}</Card.Text>
              </Col>
            </Card.Body>
            <Card.Body className="d-flex align-items-center">
              <Col md={4}>이름 :</Col>
              <Col md={4}>
                <Card.Text>{user.firstName}</Card.Text>
              </Col>
            </Card.Body>

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>성별 :</Col>
              <Col md={4}>
                <Card.Text>{user.gender}</Card.Text>
              </Col>
            </Card.Body>

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>이메일 :</Col>
              <Col md={4}>
                <Card.Text>{user.email}</Card.Text>
              </Col>
            </Card.Body>

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>휴대폰 :</Col>
              <Col md={4}>
                <Card.Text>{user.mobile}</Card.Text>
              </Col>
            </Card.Body>

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>유저 유형 :</Col>
              <Col md={4}>
                <Card.Text>{user.userType}</Card.Text>
              </Col>
            </Card.Body>

            {user.userType === "VET" && (
              <Card.Body className="d-flex align-items-center">
                <Col md={4}>전문분야 :</Col>
                <Col md={4}>
                  <Card.Text>{user.specialization}</Card.Text>
                </Col>
              </Card.Body>
            )}

            <Card.Body className="d-flex align-items-center">
              <Col md={4}>계정 상태 :</Col>
              <Col md={4}>
                <Card.Text
                  className={user.enabled ? styles.active : styles.inactive}
                >
                  {user.enabled ? "활성" : "비활성"}
                </Card.Text>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
