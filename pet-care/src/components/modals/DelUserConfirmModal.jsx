import React from "react";

const DelUserConfirmModal = ({
  show,
  onHide,
  handleDelete,
  user,
  isLoading,
}) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>계정 폐쇄 확인</Modal.Title>
      </Modal.Header>
    </Modal>
  );
};

export default DelUserConfirmModal;
