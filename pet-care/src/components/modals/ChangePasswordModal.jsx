import React from "react";
import { eyeOff } from "react-icons-kit/feather";

const ChangePasswordModal = () => {
  const [type, setType] = useState("password");
  const { icon, setIcon } = useState(eyeOff);
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
    } catch (error) {
      console.error(error.message);
      setShowErrorAlert(true);
      setErrorMsg(error.message);
    }
  };

  return <div>ChangePasswordModal</div>;
};

export default ChangePasswordModal;
