import React from "react";
import { Modal } from "react-bootstrap";

const AddPetModal = ({
  apmtId,
  petData,
  setPetData,
  index,
  show,
  closer,
  saver,
}) => {
  return <Modal show={show} onHide={closer}></Modal>;
};

export default AddPetModal;
