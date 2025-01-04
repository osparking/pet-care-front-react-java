import React from "react";

const DelUserConfirmModal = ({
  show,
  onHide,
  handleDelete,
  target,
  isLoading,
}) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>계정 폐쇄 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        이 {target}을/를 정말 삭제할 것입니까? 삭제 후 복구는 불가능합니다.
      </Modal.Body>
    </Modal>
  );
};

export default DelUserConfirmModal;
