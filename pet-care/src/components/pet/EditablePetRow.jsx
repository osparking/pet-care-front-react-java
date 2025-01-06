import React from "react";
import { Button, Form } from "react-bootstrap";
import { BsCheck, BsX } from "react-icons/bs";

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
      <td>
        <Form.Control
          type="text"
          name="type"
          value={editPet.type}
          onCancel={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="breed"
          value={editPet.breed}
          onCancel={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="color"
          value={editPet.color}
          onCancel={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          name="age"
          value={editPet.age}
          onCancel={handleChange}
        />
      </td>
      <td>
        <Button
          variant="success"
          size="sm"
          onClick={() => onSave(pet.id, editPet)}
          className="me-2"
        >
          <BsCheck />
        </Button>
      </td>
      <td colSpan={2}>
        <Button variant="secondary" size="sm" onClick={onCancel}>
          <BsX />
        </Button>
      </td>
    </tr>
  );
};

export default EditablePetRow;
