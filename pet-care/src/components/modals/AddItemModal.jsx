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
    <Modal>
      <Modal.Header></Modal.Header>
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
