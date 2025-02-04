import React, { useState } from "react";
import ApmtUpdateModal from "../modals/ApmtUpdateModal";
import ActButton from "./ActButton";

const ActPatient = ({ onUpdate, onCancel, disabled, apmt }) => {
  const [isCanceling, setCanceling] = useState(false);
  const [isUpdating, setUpdating] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleClick = (actionType) => {
    try {
      // actionType 에 따라 다르게 처리한다.
      if (actionType === "update") {
        setUpdating(true);
        setShowUpdateModal(true);
      } else {
        setCanceling(true);
        // setTimeout(() => {
        onCancel(apmt.id);
        setCanceling(false);
        // }, 500);
      }
    } catch (e) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setShowUpdateModal(false);
    setUpdating(false);
  };

  const handleUpdate = async (apmt) => {
    try {
      await onUpdate(apmt);
      handleClose();
    } catch (e) {
      console.error(error);
    }
    setUpdating(false);
  };

  return (
    <React.Fragment>
      <section className="d-flex justify-content-end gap-2 mt-2 mb-2">
        <ActButton
          title={"예약 취소"}
          action={"취소"}
          variant={"danger"}
          onClick={() => handleClick("cancel")}
          disabled={disabled}
          isProcessing={isCanceling}
        />
        <ActButton
          title={"예약 갱신"}
          action={"갱신"}
          variant={"warning"}
          onClick={() => handleClick("update")}
          disabled={disabled}
          isProcessing={isUpdating}
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
