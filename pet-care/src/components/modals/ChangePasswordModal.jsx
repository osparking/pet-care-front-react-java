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

  return <div>ChangePasswordModal</div>;
};

export default ChangePasswordModal;
