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
      >
        <option value="">- 전문분야 선택 -</option>
        {specials.map((special, idx) => (
          <option value={special} key={idx}>
            {special}
          </option>
        ))}
      </Form.Select>
    </InputGroup>
  );
};

export default VetFilter;
