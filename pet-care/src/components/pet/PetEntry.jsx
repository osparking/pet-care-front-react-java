import React from "react";
import PetColor from "./PetColor";
import { Form, Col } from "react-bootstrap";

const PetEntry = ({ pet, index, removePet, canRemove, handleInputChange }) => {
  return (
    <fieldset>
      <legend className="legend">{`팻 #${색인 + 1} 정보`}</legend>
      <Form.Group>
        <Form.Control
          type="text"
          name="petName"
          id={`petName-${index}`}
          value={pet.petName}
          placeHolder="팻 이름 입력"
          onChange={handle값변화}
          required
        />
        <Form.Control
          type="number"
          name="petAge"
          id="petAge"
          value={pet.petAge}
          placeHolder="팻 나이 입력"
          onChange={handle값변화}
          required
        />
      </Form.Group>
      <Form.Group as={Col}>
        <PetColor value={pet.petColor} onChange={handleInputChange} />
      </Form.Group>
    </fieldset>
  );
};

export default PetEntry;

