import React from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const Patient = () => {
  const [patients, setPatients] = useState([]);
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

  return <div></div>;
};

export default Patient;
