import React from "react";
import { Form } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Model.Body>
        <Form>
          <Form.Group controlId="curPwd">
            <Form.Label>현재 비밀번호: </Form.Label>
            <InputGroup>
              <Form.Control
                type={type}
                value={curPwd}
                placeholder="(현재 비밀번호)"
                name="curPwd"
                onChange={handleInputChange}
              />
              <InputGroup.Text onClick={handleTogglePasswordType}>
                <Icon icon={icon} />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="newPwd" className="mb-2">
            <Form.Label>신규 비밀번호: </Form.Label>
            <Form.Control
              type={type}
              value={newPwd}
              placeholder="(신규 비밀번호)"
              name="newPwd"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="cnfPwd" className="mb-2">
            <Form.Label>비밀번호 확인: </Form.Label>
            <Form.Control
              type={type}
              value={cnfPwd}
              placeholder="(비밀번호 확인)"
              name="cnfPwd"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Model.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
