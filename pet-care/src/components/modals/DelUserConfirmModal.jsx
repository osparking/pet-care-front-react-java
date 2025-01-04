import React from "react";
import { Button, Modal } from "react-bootstrap";

const DelUserConfirmModal = ({
  show,
  onHide,
  handleDelete,
  target,
  deleting,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>계정 폐쇄 확인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        이 {target}에 대한 복구 불가한 '삭제'를 행할 것입니까?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          취소
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
          {deleting ? "삭제 중..." : "삭제"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DelUserConfirmModal;
