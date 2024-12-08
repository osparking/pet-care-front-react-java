import React from "react";

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

  return <div>PetColor</div>;
};

export default PetColor;
