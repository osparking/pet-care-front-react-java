import React, { useEffect, useState } from "react";
import { BsPlusSquareFill } from "react-icons/bs";
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
        <Col>
          {" "}
          <div className="d-flex justify-content-end">
            <Link to={"/register-user"}>
              {" "}
              <BsPlusSquareFill />
            </Link>
          </div>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>성씨</th>
            <th>이름</th>
            <th>이메일</th>
            <th>휴대폰</th>
            <th>성별</th>
            <th>전문분야</th>
            <th>등록일</th>
            <th colSpan={4}>작업</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{vet.lastName}</td>
            <td>{vet.firstName}</td>
            <td>{vet.email}</td>
            <td>{vet.mobile}</td>
            <td>{vet.gender}</td>
            <td>{vet.specialization}</td>
            <td>{vet.createdAt}</td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </main>
  );
};

export default Veterin;
