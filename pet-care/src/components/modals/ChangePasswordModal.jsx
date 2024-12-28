import React from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";

const ChangePasswordModal = () => {
  const [type, setType] = useState("password");
  const { icon, setIcon } = useState(FiEyeOff);
  const [pwds, setPwds] = useState({
    curPwd: "",
    newPwd: "",
    cnfPwd: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPwds({ ...pwds, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { curPwd, newPwd, cnfPwd } = pwds;
    try {
      const response = await changePwd(useAccordionButton, pwds);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      handleReset();
    } catch (error) {
      console.error(error.message);
      setShowErrorAlert(true);
      setErrorMsg(error.message);
    }
  };

  const handleTogglePasswordType = () => {
    type === "password" ? setType("text") : setType("password");
    icon === FiEyeOff ? setIcon(FiEye) : setIcon(FiEyeOff);
  };

  const handleReset = () => {
    setPwds({ curPwd: "", newPwd: "", cnfPwd: "" });
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  return <div>ChangePasswordModal</div>;
};

export default ChangePasswordModal;
