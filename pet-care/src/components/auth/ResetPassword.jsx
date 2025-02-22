import React, { useState } from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const ResetPassword = () => {
  const [newPwd, setNewPwd] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenStatus, setTokenStatus] = useState("보류");
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get("token");
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
  )
};

export default ResetPassword;
