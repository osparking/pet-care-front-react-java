import React from "react";

const EditablePetRow = ({ pet, index, onSave, onCancel }) => {
  const [editPet, setEditPet] = useState(pet);
  const handleChange = (e) => {
    setEditPet((currPet) => ({
      ...currPet,
      [e.target.name]: e.target.value,
    }));
  };
  return <div>EditablePetRow</div>;
};

export default EditablePetRow;
