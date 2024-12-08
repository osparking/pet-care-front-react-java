import React from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";

const PetType = ({ value, onChange }) => {
  const [petTypes, setPetTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. 유형 변화 처리
  const handleTypeChange = (event) => {
    if (event.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(event);
    }
  };
  // 2. 새 항목 저장 처리
  const handleSaveNewType = (newType) => {
    if (newType && !petTypes.includes(newType)) {
      setPetTypes([...petTypes, newType]);
      onChange({ target: { name: "petType", value: newType } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          as="select"
          name="petType"
          value={value}
          required
          onChange={handleTypeChange}
        >
          <option value="">- 유형 -</option>
          <option value="add-new-item">유형 추가</option>
          <option value="dog">개</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        closer={() => setShowModal(false)}
        saver={handleSaveNewType}
        label={"유형"}
      />
    </React.Fragment>
  );
};

export default PetType;
