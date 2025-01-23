import React, { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import {
  BsEyeFill,
  BsLockFill,
  BsPencilFill,
  BsPlusSquareFill,
  BsTrashFill,
  BsUnlockFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import Paginator from "../common/Paginator";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import DelTargetConfirmModal from "../modals/DelTargetConfirmModal";
import { deleteUserAccount, toggleUserAccount } from "../user/UserService";
import ItemsFilter from "../user/ItemsFilter";
import { getVets } from "../veterinarians/VetService";

const Veterin = () => {
  const [veterins, setVeterins] = useState([]);
  const [showDelModal, setShowDelModal] = useState(false);
  const [vetIdToDel, setVetIdToDel] = useState(null);

  const [currPage, setCurrPage] = useState(1);
  const [vetsPerPage] = useState(5);
  const indexOfLastVet = currPage * vetsPerPage;
  const indexOfFirstVet = indexOfLastVet - vetsPerPage;
  const [filteredVets, setSelectedVets] = useState([]);
  const currentVets = filteredVets.slice(indexOfFirstVet, indexOfLastVet);

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

  const handleToggleAccount = async (vet) => {
    try {
      let result = await toggleUserAccount(vet.id, !vet.enabled);
      setVeterins(
        veterins.map((veterin) =>
          veterin.id === vet.id
            ? { ...veterin, enabled: !vet.enabled }
            : veterin
        )
      );
      setShowErrorAlert(false);
      setSuccessMsg(result.message + ", 활성값: " + !vet.enabled);
      setShowSuccessAlert(true);
    } catch (e) {
      setErrorMsg(e.response.data.message);
      setShowSuccessAlert(false);
      setShowErrorAlert(true);
    }
  };

  const [selectedSpecial, setSelectedSpecial] = useState("");

  const handleClearFilter = () => {
    setSelectedSpecial("");
  };

  useEffect(() => {
    let filtered = veterins;
    if (selectedSpecial) {
      filtered = filtered.filter(
        (vet) => vet.specialization === selectedSpecial
      );
    }
    setSelectedVets(filtered);
  }, [selectedSpecial, veterins]);

  const specials = Array.from(
    new Set(veterins.map((vet) => vet.specialization))
  );

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
      <Row className="mb-2">
        <Col md={6}>
          <ItemsFilter
            label={"전문분야"}
            options={specials}
            selectedOption={selectedSpecial}
            onOptionSelection={setSelectedSpecial}
            onClearFilter={handleClearFilter}
          />
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
          {currentVets.map((vet, index) => (
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
                    <Tooltip id={`tooltip-view-${index}`}>
                      {vet.enabled ? "계정 잠금" : "잠금 해제"}
                    </Tooltip>
                  }
                >
                  <span
                    onClick={() => handleToggleAccount(vet)}
                    style={{ cursor: "pointer" }}
                  >
                    {vet.enabled ? <BsUnlockFill /> : <BsLockFill />}
                  </span>
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
      <Paginator
        pageSize={vetsPerPage}
        totalItems={filteredVets.length}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    </main>
  );
};

export default Veterin;
