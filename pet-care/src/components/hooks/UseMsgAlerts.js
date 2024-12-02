import React, { useState } from "react";

const UseMsgAlerts = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  return {
    successMsg,
    errorMsg,
    setSuccessMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  };
};

export default UseMsgAlerts;
