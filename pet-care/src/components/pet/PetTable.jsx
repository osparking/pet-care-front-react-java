import React from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const PetTable = ({ pets, apmtId, onPetUpdate, isEditable }) => {
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
  } = UseMsgAlerts;

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
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      onPetUpdate(apmtId);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return <div>PetTable</div>;
};

export default PetTable;
