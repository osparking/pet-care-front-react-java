import React from "react";

const EditablePetRow = ({ pet, index, onSave, onCancel }) => {
  const [editPet, setEditPet] = useState(pet);
  const handleChange = (e) => {
    setEditPet((currPet) => ({
      ...currPet,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          name="name"
          value={editPet.name}
          onCancel={handleChange}
        />
      </td>
    </tr>
  );
};

export default EditablePetRow;
