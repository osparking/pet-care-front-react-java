import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const AddItemModal = ({ show, closer, saver, label }) => {
  const [itemValue, setItemValue] = useState("");
  const handle추가 = () => {
    saver(itemValue);
    setItemValue("");
    closer();
  };
  const handle이름변화 = (e) => {
    setItemValue(e.target.value);
  };

  return (
    <Modal show={show} onHide={closer}>
      <Modal.Header closeButton>
        <Modal.Title>새 {label} 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-1">
            <Form.Label>{label} 명</Form.Label>
            <Form.Control
              type="text"
              value={itemValue}
              placeholder={`새 ${label.toLowerCase()}을 입력하라`}
              onChange={handle이름변화}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handle추가}>
          추가
        </Button>
        <Button variant="danger" onClick={closer}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
