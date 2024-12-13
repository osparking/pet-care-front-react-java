import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getPetColors } from "./PetService";

const PetColor = ({ value, onChange }) => {
  const [petColors, setPetColors] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const readColors = async () => {
      try {
        const response = await getPetColors();
        setPetColors(data);
      } catch (error) {
        console.error("팻 색상 채취 오류:", error);
      }
    };
    readColors();
  }, []);

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
          {petColors.map(() => (
            <option value={color} key={color}>
              {color}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        closer={() => setShowModal(false)}
        saver={handleSaveNewColor}
        label={"색상"}
      />
    </React.Fragment>
  );
};

export default PetColor;
