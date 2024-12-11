import React from "react";
import { Button, Col, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FaMinusSquare } from "react-icons/fa";
import PetBreed from "./PetBreed";
import PetColor from "./PetColor";
import PetType from "./PetType";

const PetEntry = ({ pet, index, removePet, canRemove, handleInputChange }) => {
  return (
    <fieldset>
      <legend className="legend">{`팻 #${index + 1} 정보`}</legend>
      <Form.Group>
        <Form.Control
          type="text"
          name="petName"
          id={`petName-${index}`}
          value={pet.petName}
          placeHolder="팻 이름 입력"
          onChange={handleInputChange}
          required
        />
        <Form.Control
          type="number"
          name="petAge"
          id="petAge"
          value={pet.petAge}
          placeHolder="팻 나이 입력"
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group as={Col} className="mb-2">
        <PetColor value={pet.petColor} onChange={handleInputChange} />
      </Form.Group>
      <fieldset className="field-set">
        <legend className="legend">팻 유형 및 품종</legend>
        <Form.Group as={Row} className="mb-2 d-flex">
          <Col>
            <PetType value={pet.PetType} onChange={handleInputChange} />
          </Col>
          <Col>
            <PetBreed
              petType={pet.petType}
              value={pet.petBreed}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
      </fieldset>
      {canRemove && (
        <div className="d-flex justify-content-end mt-2">
          <OverlayTrigger overlay={<Tooltip>팻 제거</Tooltip>}>
            <Button variant="danger" size="sm" onClick={() => removePet(index)}>
              <FaMinusSquare />
            </Button>
          </OverlayTrigger>
        </div>
      )}
    </fieldset>
  );
};

export default PetEntry;
