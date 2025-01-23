import React from "react";
import { InputGroup, Button, Form } from "react-bootstrap";

const VetFilter = ({
  label,
  options = [],
  selectedOption,
  onOptionSelection,
  onClearFilter,
}) => {
  return (
    <InputGroup className="mb-2">
      <InputGroup.Text>전문분야 검색</InputGroup.Text>
      <Form.Select
        className="form-control"
        value={selectedOption}
        onChange={(e) => onOptionSelection(e.target.value)}
      >
        <option value="">- 전문분야 선택 -</option>
        {options.map((special, idx) => (
          <option value={special} key={idx}>
            {special}
          </option>
        ))}
      </Form.Select>
      <Button variant="secondary" onClick={onClearFilter}>
        초기화
      </Button>
    </InputGroup>
  );
};

export default VetFilter;
