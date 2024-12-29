import React from "react";
import { Card } from "react-bootstrap";
import ImageUser from "../common/ImageUser";

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
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
