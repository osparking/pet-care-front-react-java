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
  const handlePetChange = (e) => {
    const { name, value } = e.target;
    petData[name] = value;
    setPetData((prevState) => ({ ...prevState, [name]: value }));
  };

  return <Modal show={show} onHide={closer}></Modal>;
};

export default AddPetModal;
