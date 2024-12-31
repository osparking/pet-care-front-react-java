import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { Icon } from "react-icons-kit";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { changePwd } from "../user/UserService";

const ChangePasswordModal = ({ userId, show, handleClose }) => {
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
      const response = await changePwd(userId, curPwd, newPwd, cnfPwd);
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
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMsg} />
        )}
        <Form>
          <Form.Group controlId="curPwd">
            <Form.Label>현재 비밀번호: </Form.Label>
            <InputGroup>
              <Form.Control
                type={type}
                value={pwds.curPwd}
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
              value={pwds.newPwd}
              placeholder="(신규 비밀번호)"
              name="newPwd"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="cnfPwd" className="mb-2">
            <Form.Label>비밀번호 확인: </Form.Label>
            <Form.Control
              type={type}
              value={pwds.cnfPwd}
              placeholder="(비밀번호 확인)"
              name="cnfPwd"
              onChange={handleInputChange}
            />
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <div className="mx-2">
              <Button variant="primary" size="sm" type="submit">
                비밀번호 변경
              </Button>
            </div>
            <div className="mx-2 mb-4">
              <Button variant="secondary" size="sm" onClick={handleReset}>
                리셋
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ChangePasswordModal;
