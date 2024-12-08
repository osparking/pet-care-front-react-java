import React from "react";

const PetEntry = ({ pet, index, removePet, canRemove, handleInputChange }) => {
  return (
    <fieldset>
      <legend className="legend">{`팻 #${색인 + 1} 정보`}</legend>
      <Form.Group>
        <Form.Control></Form.Control>
      </Form.Group>
    </fieldset>
  );
};

export default PetEntry;
