import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import DelTargetConfirmModal from "../modals/DelTargetConfirmModal";
import EditablePetRow from "./EditablePetRow";
import { deletePetAPI, updatePetAPI } from "./PetService";

const PetTable = ({ pets, apmtId, onPetUpdate, isEditable, isPatient }) => {
  const [editModeId, setEditModeId] = useState(null);
  const [showDelModal, setShowDelModal] = useState(false);
  const [petToDel, setPetToDel] = useState(null);
  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMsgAlerts();

  const handleEdit = (petId) => {
    setEditModeId(petId);
  };

  const handleCancel = () => {
    setEditModeId(null);
  };

  const handleDelete = (petId) => {
    setPetToDel(petId);
    setShowDelModal(true);
  };

  const callPetDeleteAPI = async () => {
    try {
      const response = await deletePetAPI(petToDel);
      setShowDelModal(false);
      onPetUpdate(apmtId);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  const callPetUpdateAPI = async (petId, updatedPet) => {
    try {
      const response = await updatePetAPI(petId, updatedPet);
      onPetUpdate(apmtId);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      setEditModeId(null);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <section>
      <DelTargetConfirmModal
        show={showDelModal}
        onHide={() => setShowDelModal(false)}
        handleDelete={callPetDeleteAPI}
        target="'애완동물'"
      />
      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMsg} />
      )}
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>이름</th>
            <th>유형</th>
            <th>품종</th>
            <th>색상</th>
            <th>나이</th>
            {isPatient && <th colSpan={3}>작업</th>}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(pets) &&
            pets.map((pet, index) =>
              editModeId === pet.id ? (
                <EditablePetRow
                  key={index}
                  index={index}
                  pet={pet}
                  onCancel={handleCancel}
                  onSave={callPetUpdateAPI}
                />
              ) : (
                <tr key={pet.id}>
                  <td>{pet.name}</td>
                  <td>{pet.type}</td>
                  <td>{pet.breed}</td>
                  <td>{pet.color}</td>
                  <td>{pet.age}</td>
                  {isPatient && (
                    <React.Fragment>
                      <td>
                        <Button
                          className="btn btn-sm btn-warning"
                          disabled={!isEditable}
                          onClick={() => handleEdit(pet.id)}
                        >
                          <BsPencilFill />
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn btn-sm btn-danger"
                          disabled={!isEditable}
                          onClick={() => handleDelete(pet.id)}
                        >
                          <BsTrashFill />
                        </Button>
                      </td>
                    </React.Fragment>
                  )}
                </tr>
              )
            )}
        </tbody>
      </Table>
    </section>
  );
};

export default PetTable;
