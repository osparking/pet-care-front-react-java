import React, { useEffect, useState } from "react";
import { Col, OverlayTrigger, Row, Table, Tooltip } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import Paginator from "../common/Paginator";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { getPatients } from "../patient/PatientService";
import ItemsFilter from "../user/ItemsFilter";

const Patient = () => {
  const [patients, setPatients] = useState([]);
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

  const fetchPatients = async () => {
    try {
      const response = await getPatients();
      setPatients(response.data);
    } catch (error) {
      console.error(error);
      setErrorMsg(error.message);
      setShowErrorAlert(true);
    }
  };

  const emails = Array.from(new Set(patients.map((patient) => patient.email)));
  const [selectedEmail, setSelectedEmail] = useState(
    localStorage.getItem("selectedEmail") || ""
  );
  const handleClearFilter = () => {
    setSelectedEmail("");
  };

  const [filtered, setFiltered] = useState([]);

  const [currPatPage, setCurrPatPage] = useState(
    localStorage.getItem("currPatPage") || 1
  );

  useEffect(() => {
    localStorage.setItem("currPatPage", currPatPage);
  }, [currPatPage]);

  const [patsPerPage] = useState(5);
  const indexOfLastPat = currPatPage * patsPerPage;
  const indexOfFirstPat = indexOfLastPat - patsPerPage;
  const currentPats = filtered.slice(indexOfFirstPat, indexOfLastPat);

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedEmail", selectedEmail);
    if (selectedEmail) {
      setFiltered(
        patients.filter((patient) => patient.email === selectedEmail)
      );
    } else {
      setFiltered(patients);
    }
  }, [patients, selectedEmail]);

  return (
    <main>
      <h5>팻 주인(=환자) 목록</h5>
      <Row>
        <Col>
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMsg} />
          )}
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMsg} />
          )}
        </Col>
      </Row>
      <Row className="mb-2">
        <Col md={6}>
          <ItemsFilter
            label={"이메일"}
            options={emails}
            selectedOption={selectedEmail}
            onOptionSelection={setSelectedEmail}
            onClearFilter={handleClearFilter}
          />
        </Col>
      </Row>
      <Table bordered hover striped>
        <thead>
          <tr>
            <th>아이디</th>
            <th>성씨</th>
            <th>이름</th>
            <th>이메일</th>
            <th>휴대폰</th>
            <th>성별</th>
            <th>등록일</th>
            <th colSpan={2}>작업</th>
          </tr>
        </thead>
        <tbody>
          {currentPats.map((patient, idx) => (
            <tr key={idx}>
              <td>{patient.id}</td>
              <td>{patient.lastName}</td>
              <td>{patient.firstName}</td>
              <td>{patient.email}</td>
              <td>{patient.mobile}</td>
              <td>{patient.gender}</td>
              <td>{patient.createdAt}</td>
              <td>
                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip-view-${idx}`}>팻 주인 열람</Tooltip>
                  }
                >
                  <Link
                    to={`/user_dashboard/${patient.id}/my_dashboard`}
                    className="text-info"
                  >
                    <BsEyeFill />
                  </Link>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginator
        pageSize={patsPerPage}
        totalItems={filtered.length}
        currPage={currPatPage}
        setCurrPage={setCurrPatPage}
      />
    </main>
  );
};

export default Patient;
