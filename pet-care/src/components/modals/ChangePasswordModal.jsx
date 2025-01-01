import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { FiEye, FiEyeOff } from "react-icons/fi";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { changePwd } from "../user/UserService";

const ChangePasswordModal = ({ userId, show, handleClose }) => {
  const [typeCur, setTypeCur] = useState("password");
  const [typeNew, setTypeNew] = useState("password");
  const [typeCnf, setTypeCnf] = useState("password");
  const [iconCur, setIconCur] = useState(FiEyeOff);
  const [iconNew, setIconNew] = useState(FiEyeOff);
  const [iconCnf, setIconCnf] = useState(FiEyeOff);
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

  const handleToggleHideCur = () => {
    if (typeCur === "password") {
      setTypeCur("text");
      setIconCur(FiEye);
    } else {
      setTypeCur("password");
      setIconCur(FiEyeOff);
    }
  };

  const handleToggleHideNew = () => {
    if (typeNew === "password") {
      setTypeNew("text");
      setIconNew(FiEye);
    } else {
      setTypeNew("password");
      setIconNew(FiEyeOff);
    }
  };

  const handleToggleHideCnf = () => {
    if (typeCnf === "password") {
      setTypeCnf("text");
      setIconCnf(FiEye);
    } else {
      setTypeCnf("password");
      setIconCnf(FiEyeOff);
    }
  };

  const handleReset = () => {
    setPwds({ curPwd: "", newPwd: "", cnfPwd: "" });
    setShowErrorAlert(false);
    setShowSuccessAlert(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton={true}>
        <Modal.Title>비밀번호 변경</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
        {showSuccessAlert && (
          <AlertMessage type={"success"} message={successMsg} />
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="curPwd">
            <Form.Label>현재 비밀번호: </Form.Label>
            <InputGroup>
              <Form.Control
                type={typeCur}
                value={pwds.curPwd}
                placeholder="(현재 비밀번호)"
                name="curPwd"
                onChange={handleInputChange}
              />
              <InputGroup.Text onClick={handleToggleHideCur}>
                {iconCur}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="newPwd" className="mb-2">
            <Form.Label>신규 비밀번호: </Form.Label>
            <InputGroup>
              <Form.Control
                type={typeNew}
                value={pwds.newPwd}
                placeholder="(신규 비밀번호)"
                name="newPwd"
                onChange={handleInputChange}
              />
              <InputGroup.Text onClick={handleToggleHideNew}>
                {iconNew}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="cnfPwd" className="mb-2">
            <Form.Label>비밀번호 확인: </Form.Label>
            <InputGroup>
              <Form.Control
                type={typeCnf}
                value={pwds.cnfPwd}
                placeholder="(비밀번호 확인)"
                name="cnfPwd"
                onChange={handleInputChange}
              />
              <InputGroup.Text onClick={handleToggleHideCnf}>
                {iconCnf}
              </InputGroup.Text>
            </InputGroup>
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
