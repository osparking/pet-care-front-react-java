import React, { useState } from "react";
import { useAlertWithTimeout } from "../utils/utilities";

const UseMsgAlerts = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useAlertWithTimeout();
  const [showSuccessAlert, setShowSuccessAlert] = useAlertWithTimeout();
  return {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  };
};

export default UseMsgAlerts;
