import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageUser from "../common/ImageUser";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ImageUpModal from "../modals/ImageUpModal";

const UserProfile = ({ user }) => {
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
              <Link to={"#"} onClick={handleShowImageUpModal}>
                사진 변경
              </Link>
              <ImageUpModal
                userId={user.id}
                show={showImageUpModal}
                handleClose={handleCloseImageUpModal}
              />
              <Link to={"#"} onClick={""}>
                사진 제거
              </Link>
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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
