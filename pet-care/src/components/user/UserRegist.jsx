import React from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const UserRegist = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    userType: "",
    specialty: "",
  });

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
  
  return <div>UserRegist</div>;
};

export default UserRegist;
