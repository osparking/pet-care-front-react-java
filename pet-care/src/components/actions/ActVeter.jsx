import React, { useState } from "react";
import ActButton from "./ActButton";

const ActVeter = ({ onApprove, onDecline, disabled, apmt }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = (actionType) => {
    setIsProcessing(true);
    // actionType 에 따라 다르게 처리한다.
    if (actionType === "approve") {
      onApprove(apmt.id)
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    } else {
      onDecline(apmt.id)
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <section className="d-flex justify-content-end gap-2 mt-2 mb-2">
      <ActButton
        title={"예약 승인"}
        variant={"success"}
        onClick={() => handleClick("approve")}
        disabled={disabled}
        isProcessing={isProcessing}
      />
      <ActButton
        title={"예약 거절"}
        variant={"warning"}
        onClick={() => handleClick("decline")}
        disabled={disabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default ActVeter;
