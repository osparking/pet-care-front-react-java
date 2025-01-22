import React from "react";
import { InputGroup } from "react-bootstrap";

const VetFilter = ({
  specials = [],
  selectedSpecial,
  onSelectSpecial,
  onClearFilter,
}) => {
  return (
    <InputGroup>
      <InputGroup.Text>전문분야 검색</InputGroup.Text>
      <Form.Select
        className="form-control"
        value={selectedSpecial}
        onChange={(e) => onSelectSpecial(e.target.value)}
      ></Form.Select>
    </InputGroup>
  );
};

export default VetFilter;
