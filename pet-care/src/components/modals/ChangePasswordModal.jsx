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
    setPwds({...pwds, [name]: value });
  };

  return <div>ChangePasswordModal</div>;
};

export default ChangePasswordModal;
