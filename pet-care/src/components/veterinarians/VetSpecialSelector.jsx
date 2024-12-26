import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getSpecializations } from "./VetService";

const VetSpecialSelector = ({ value, onChange }) => {
  const [vetSpecials, setVetSpecials] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const readSpecials = async () => {
      try {
        const response = await getSpecializations();
        setVetSpecials(response.data);
      } catch (error) {
        console.error("수의사 전문분야 채취 오류:", error);
      }
    };
    readSpecials();
  }, []);

  // 1. 전문분야 변화 처리
  const handleSpecialChange = (event) => {
    if (event.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(event);
    }
  };
  // 2. 새 전문분야 저장 처리
  const handleSaveNewSpecial = (newSpecial) => {
    if (newSpecial && !vetSpecials.includes(newSpecial)) {
      setVetSpecials([...vetSpecials, newSpecial]);
      onChange({ target: { name: "specialization", value: newSpecial } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          as="select"
          name="specialization"
          value={value}
          required
          onChange={handleSpecialChange}
        >
          <option value="">- 전문분야 -</option>
          <option value="add-new-item">전문분야 추가</option>
          {vetSpecials.map((special) => (
            <option value={special} key={special}>
              {special}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        closer={() => setShowModal(false)}
        saver={handleSaveNewSpecial}
        label={"전문분야"}
      />
    </React.Fragment>
  );
};

export default VetSpecialSelector;
