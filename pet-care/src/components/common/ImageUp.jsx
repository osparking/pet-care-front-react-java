import React from "react";
import { InputGroup, Modal } from "react-bootstrap";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const ImageUp = ({ userId }) => {
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
      const fileBytes = new Unit8Array(e.target.result);

      if (user && user.photo) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = async (e) => {
          const response = await updateUserPhoto(user.photoId, fileBytes);
          setSuccessMsg(result.data);
          window.location.reload();
          setShowSuccessAlert(true);
        };
      } else {
        const response = await uploadUserPhoto(userId, fileBytes);
        setSuccessMsg(response.data);
        window.location.reload();
        setShowSuccessAlert(true);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
      console.error(error.message);
    }
  };
  return (
    <Modal>
      <Modal.Header></Modal.Header>
      <Modal.Body>
        <Form>
          <InputGroup>
            <Form.Control type="file">
              <Button variant="secondary" onClick={handleImageUp}>
                올리기
              </Button>
            </Form.Control>
          </InputGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ImageUp;
