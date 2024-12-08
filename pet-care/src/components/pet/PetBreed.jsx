import React from "react";
import { Form } from "react-bootstrap";
import AddItemModal from "../modals/AddItemModal";

const PetBreed = ({ value, onChange }) => {
  const [petBreeds, setPetBreeds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 1. 품종 변화 처리
  const handleBreedChange = (event) => {
    if (event.target.value === "add-new-item") {
      setShowModal(true);
    } else {
      onChange(event);
    }
  };
  // 2. 새 항목 저장 처리
  const handleSaveNewBreed = (newBreed) => {
    if (newBreed && !petBreeds.includes(newBreed)) {
      setPetBreeds([...petBreeds, newBreed]);
      onChange({ target: { name: "petBreed", value: newBreed } });
    }
  };

  return (
    <React.Fragment>
      <Form.Group>
        <Form.Control
          as="select"
          name="petBreed"
          value={value}
          required
          onChange={handleBreedChange}
        >
          <option value="">- 품종 -</option>
          <option value="add-new-item">품종 추가</option>
          <option value="보더콜리">보더콜리</option>
        </Form.Control>
      </Form.Group>
      <AddItemModal
        show={showModal}
        closer={() => setShowModal(false)}
        saver={handleSaveNewBreed}
        label={"품종"}
      />
    </React.Fragment>
  );
};

export default PetBreed;
