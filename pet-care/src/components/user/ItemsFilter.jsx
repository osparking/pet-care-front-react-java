import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const ItemsFilter = ({
  label,
  options = [],
  selectedOption,
  onOptionSelection,
  onClearFilter,
}) => {
  return (
    <InputGroup className="mb-2">
      <InputGroup.Text>{label} 검색</InputGroup.Text>
      <Form.Select
        className="form-control"
        value={selectedOption}
        onChange={(e) => onOptionSelection(e.target.value)}
      >
        <option value="">- {label} 선택 -</option>
        {options.map((option, idx) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </Form.Select>
      <Button variant="secondary" onClick={onClearFilter}>
        초기화
      </Button>
    </InputGroup>
  );
};

export default ItemsFilter;
