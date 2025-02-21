import React, { useEffect, useState } from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const PwdResetRequest = () => {
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
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
  return (
    <div>
    </div>
  );
};

export default PwdResetRequest;
