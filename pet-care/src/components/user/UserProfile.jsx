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
          <Card>
            <Card.Body>
              <ImageUser photoUser={user.photo} />
            </Card.Body>
            <div>
              <Link to={"#"} onClick={handleShowImageUpModal}>
                사진 변경
              </Link>
              <ImageUpModal userId={user.id} userPhoto={user.photo} />
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
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
