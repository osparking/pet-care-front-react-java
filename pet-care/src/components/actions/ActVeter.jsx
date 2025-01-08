import React, { useState } from "react";
import ActButton from "./ActButton";

const ActVeter = ({ onApprove, onDecline, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  return (
    <section>
      <ActButton />
    </section>
  );
};

export default ActVeter;
