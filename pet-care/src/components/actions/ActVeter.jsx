import React, { useState } from "react";
import ActButton from "./ActButton";

const ActVeter = ({ onApprove, onDecline, disabled, apmt }) => {
  const [isApproving, setApproving] = useState(false);
  const [isDeclining, setDeclining] = useState(false);

  const handleClick = (actionType) => {
    // actionType 에 따라 다르게 처리한다.
    if (actionType === "approve") {
      setApproving(true)
      onApprove(apmt.id)
        .then(() => {
          setApproving(false);
        })
        .catch(() => {
          setApproving(false);
        });
    } else {
      setDeclining(true);
      onDecline(apmt.id)
        .then(() => {
          setDeclining(false);
        })
        .catch(() => {
          setDeclining(false);
        });
    }
  };
  
  return (
    <section className="d-flex justify-content-end gap-2 mt-2 mb-2">
      <ActButton
        title={"예약 승인"}
        action={"승인"}
        variant={"success"}
        onClick={() => handleClick("approve")}
        disabled={disabled}
        isProcessing={isApproving}
      />
      <ActButton
        title={"예약 거절"}
        action={"거절"}
        variant={"warning"}
        onClick={() => handleClick("decline")}
        disabled={disabled}
        isProcessing={isDeclining}
      />
    </section>
  );
};

export default ActVeter;
