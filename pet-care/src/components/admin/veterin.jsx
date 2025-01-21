import React, { useEffect, useState } from "react";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { deleteUserAccount } from "../user/UserService";
import { getVets } from "../veterinarians/VetService";

const Veterin = () => {
  const [veterins, setVeterins] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [vetIdToDel, setVetIdToDel] = useState(null);

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

  const readAllVeters = () => {
    getVets()
      .then((data) => {
        setVeterins(data.data);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setShowErrorAlert(true);
      });
  };

  useEffect(() => {
    readAllVeters();
  }, []);

  const handleDelVet = async () => {
    if (vetIdToDel) {
      try {
        const result = await deleteUserAccount(vetIdToDel);
        setSuccessMsg(result.message);
        setShowSuccessAlert(true);
        setShowDelModal(false);
        readAllVeters();
      } catch (err) {
        setErrorMsg(err.message);
        setShowErrorAlert(true);
      }
    }
  };

  const handleShowDelModal = (vetId) => {
    setShowDelModal(true);
    setVetIdToDel(vetId);
  };

  return (
    <main>
      <DelTargetConfirmModal
        show={showDelModal}
        onHide={() => setShowDelModal(false)}
        handleDelete={handleDelVet}
        target="수의사"
      />
      <Row>
        <Col>
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMsg} />
          )}
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMsg} />
          )}
        </Col>
        <Col></Col>
      </Row>
    </main>
  );
};

export default Veterin;
