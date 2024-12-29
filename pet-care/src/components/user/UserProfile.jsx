import React from "react";

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
        <Col>
          <Card></Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserProfile;
