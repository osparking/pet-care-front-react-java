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

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setShowErrorAlert(true);
    }
  }

  useEffect(() => {
    fetchPatients();
  }, []);

  return <div></div>;
};

export default Patient;
