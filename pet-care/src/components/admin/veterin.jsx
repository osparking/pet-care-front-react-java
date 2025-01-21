import React, { useState } from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const Veterin = () => {
  const [veterins, setVetermins] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [vetToDel, setVetToDel] = useState(null);

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

export default Veterin;
