import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { getUserById } from "../user/UserService";
import { updateUserPhoto, uploadUserPhoto } from "./ImageService";

const ImageUpModal = ({ userId, show, handleClose }) => {
  // 1. 유저 읽기
  // 2. 원래 영상을 가지고 있나 검사
  // 2-1. 있다 - 기존 영상 갱신
  // 2-2. 없다 - 새로운 영상 받아서 업로드

  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);

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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const getUser = async () => {
    try {
      const result = getUserById(userId);
      setSuccessMsg(result.data);
    } catch (e) {
      setErrorMsg(e.response.data.message);
      setShowErrorAlert(true);
      console.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const handleImageUp = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);

      if (user && user.photo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = async (e) => {
          const fileBytes = new Uint8Array(e.target.result);
          const response = await updateUserPhoto(user.photoId, fileBytes);
          setSuccessMsg(response.data);
          window.location.reload();
          setShowSuccessAlert(true);
        };
      } else {
        const response = await uploadUserPhoto(userId, file);
        setSuccessMsg(response.data);
        window.location.reload();
        setShowSuccessAlert(true);
      }
    } catch (error) {
      console.error("error message: ", error.message);
      setErrorMsg(error.message);
      setShowErrorAlert(true);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>프로필 사진</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccessAlert && (
          <AlertMessage type="success" message={successMsg} />
        )}
        {showErrorAlert && <AlertMessage type="danger" message={errorMsg} />}
        <Form>
          <h6>프로필 사진을 선택하세요:</h6>
          <InputGroup>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button variant="secondary" onClick={handleImageUp}>
              올리기
            </Button>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImageUpModal;
