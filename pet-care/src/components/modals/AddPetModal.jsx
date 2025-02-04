import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import PetEntry from "../pet/PetEntry";

const AddPetModal = ({
  apmtId,
  petData,
  setPetData,
  index,
  show,
  closer,
  saver,
}) => {
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    petData[name] = value;
    setPetData((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal show={show} onHide={closer}>
      <Modal.Header closeButton>
        <Modal.Title>새 팻 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* {console.log("pet a: ", petData)} */}
          <PetEntry
            pet={petData}
            index={index}
            handleInputChange={(e) => handlePetChange(e)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => saver(apmtId, petData)}>
          저장
        </Button>
        <Button variant="danger" onClick={closer}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPetModal;
