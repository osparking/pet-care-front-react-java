import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { getUserById } from "../user/UserService";

const UserUpdate = () => {
  const [user, setUser] = useState({
    lastName: "",
    firstName: "",
    gender: "",
    mobile: "",
    specialization: "",
    email: "",
    userType: "",
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

  const [isProcessing, setIsProcessing] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log("user ID: ", userId);
        const result = await getUserById(userId);
        setUser(result.data);
        console.log("user data: ", result.data);
      } catch (error) {
        setErrorMsg(error.response.data.message);
        setShowErrorAlert(true);
      }
    };
    getUser();
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  return <div>UserUpdate</div>;
};

export default UserUpdate;
