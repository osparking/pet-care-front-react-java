import React from "react";
import { Form } from "react-bootstrap";

const PetColor = ({ value, onChange }) => {
  const [petColors, setPetColors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. 색상 변화 처리
  const handleColorChange = (event) => {
    if (event.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(event);
    }
  };
  // 2. 새 항목 저장 처리
  const handleSaveNewColor = (newColor) => {
    if (newColor && !petColors.includes(newColor)) {
      setPetColors([...petColors, newColor]);
      onChange({ target: { name: "petColor", value: newColor } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          as="select"
          name="petColor"
          value={value}
          required
          onChange={handleColorChange}
        >
          <option value="">- 색상 -</option>
          <option value="add-new-item">색상 추가</option>
          <option value="white">흰색</option>
        </Form.Control>
      </Form.Group>
    </React.Fragment>
  );
};

export default PetColor;
