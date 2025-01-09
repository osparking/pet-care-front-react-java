import React, { useState } from "react";
import ApmtUpdateModal from "../modals/ApmtUpdateModal";
import ActButton from "./ActButton";

const ActPatient = ({ onUpdate, onCancel, disabled, apmt }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleClick = (actionType) => {
    setIsProcessing(true);
    try {
      // actionType 에 따라 다르게 처리한다.
      if (actionType === "update") {
        setShowUpdateModal(true);
      } else {
        onCancel(apmt.id);
      }
    } catch (e) {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdate = async (apmt) => {
    setIsProcessing(true);
    try {
      await onUpdate(apmt);
      handleClose();
    } catch (e) {
      console.error(error);
    }
    setIsProcessing(false);
  };

  return (
    <React.Fragment>
      <section className="d-flex justify-content-end gap-2 mt-2 mb-2">
        <ActButton
          title={"예약 취소"}
          variant={"danger"}
          onClick={() => handleClick("cancel")}
          disabled={disabled}
          isProcessing={isProcessing}
        />
        <ActButton
          title={"예약 갱신"}
          variant={"warning"}
          onClick={() => handleClick("update")}
          disabled={disabled}
          isProcessing={isProcessing}
        />
      </section>
      {showUpdateModal && (
        <ApmtUpdateModal
          show={true}
          apmt={apmt}
          doClose={handleClose}
          doUpdate={handleUpdate}
        />
      )}
    </React.Fragment>
  );
};

export default ActPatient;
