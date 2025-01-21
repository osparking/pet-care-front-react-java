import React, { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Table } from "react-bootstrap";
import {
  BsEyeFill,
  BsLockFill,
  BsPencilFill,
  BsPlusSquareFill,
  BsTrashFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { Tooltip } from "recharts";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import DelTargetConfirmModal from "../modals/DelTargetConfirmModal";
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
          {veterins.map((vet, index) => (
            <tr>
              <td>{vet.lastName}</td>
              <td>{vet.firstName}</td>
              <td>{vet.email}</td>
              <td>{vet.mobile}</td>
              <td>{vet.gender}</td>
              <td>{vet.specialization}</td>
              <td>{vet.createdAt}</td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>정보 열람</Tooltip>
                  }
                >
                  <Link to={"/"} className="text-info">
                    <BsEyeFill />
                  </Link>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>정보 편집</Tooltip>
                  }
                >
                  <Link to={`/update-user/${vet.id}`} className="text-warning">
                    <BsPencilFill />
                  </Link>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>계정 잠금</Tooltip>
                  }
                >
                  <Link to={"/"}>
                    <BsLockFill />
                  </Link>
                </OverlayTrigger>
              </td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${index}`}>계정 삭제</Tooltip>
                  }
                >
                  <Link
                    to={"#"}
                    className="text-danger"
                    onClick={() => handleShowDelModal(vet.id)}
                  >
                    <BsTrashFill />
                  </Link>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </main>
  );
};

export default Veterin;
