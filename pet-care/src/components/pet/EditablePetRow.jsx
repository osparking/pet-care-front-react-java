import React, { useState } from "react";
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
          onChange={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="type"
          value={editPet.type}
          onChange={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="breed"
          value={editPet.breed}
          onChange={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="color"
          value={editPet.color}
          onChange={handleChange}
        />
      </td>
      <td>
        <Form.Control
          type="number"
          name="age"
          value={editPet.age}
          onChange={handleChange}
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
