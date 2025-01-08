import React, { useState } from "react";
import ActButton from "./ActButton";

const ActPatient = ({ onUpdate, onCancel, disabled, apmt }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleClick = (actionType) => {
    setIsProcessing(true);
    // actionType 에 따라 다르게 처리한다.
    if (actionType === "update") {
      setShowUpdateModal(true);
    } else {
      onCancel();
    }
  };
  return (
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
  );
};

export default ActPatient;
