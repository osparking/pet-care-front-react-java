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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleReset = () => {
    setUser({
      lastName: "",
      firstName: "",
      gender: "",
      phone: "",
      email: "",
      password: "",
      userType: "",
      specialty: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await registUser(user);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      handleReset();
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return <div>UserRegist</div>;
};

export default UserRegist;
