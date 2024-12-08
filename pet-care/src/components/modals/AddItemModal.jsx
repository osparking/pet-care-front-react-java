import React from "react";
import { Modal } from "react-bootstrap";

const AddItemModal = ({ show, closer, saver, label }) => {
  const [itemValue, setItemValue] = useState("");
  const handleSaveItem = () => {
    saver(itemValue);
    setItemValue("");
    closer();
  };
  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>새 {label} 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label></Form.Label>
            <Form.Control></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default AddItemModal;
