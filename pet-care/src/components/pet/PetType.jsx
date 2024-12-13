import React, { useState } from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";
import { getPetTypes } from "./PetService";

const PetType = ({ value, onChange }) => {
  const [petTypes, setPetTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const readTypes = async () => {
      try {
        const response = await getPetTypes();
        setPetTypes(response.data);
      } catch (error) {
        console.error("팻 유형 채취 오류:", error);
      }
    };
    readTypes();
  }, []);

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
          {petColors.map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
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
