import ko from "date-fns/locale/ko";
import React, { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import ActPatient from "../actions/ActPatient";
import ActVeter from "../actions/ActVeter";
import AlertMessage from "../common/AlertMessage";
import UserInfo from "../common/UserInfo";
import useColorMapping from "../hooks/ColorMapping";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import PetTable from "../pet/PetTable";
import { UserType } from "../utils/utilities";
import {
  approveApmt,
  cancelApmt,
  declineApmt,
  updateApmt,
} from "./ServiceAppointment";

const ApmtAccordion = ({ user, apmts: oldApmts, isPatient }) => {
  registerLocale("ko", ko);
  const [apmts, setApmts] = useState(oldApmts);

  const [selectedStat, setSelectedStat] = useState("");
  const [filteredApmts, setFilteredApmts] = useState([]);

  const handlePetsUpdate = (apmtId) => {
    // TODO: Update appointment status
  };
  const colors = useColorMapping();

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

  // 수의사:
  // 작업 1 - 예약 승인
  const appointmentBeingApproved = async (apmtId) => {
    try {
      const result = await approveApmt(apmtId);
      setApmts(
        apmts.map((apmt) =>
          apmt.id == apmtId ? { ...apmt, status: "승인됨" } : apmt
        )
      );
      setSuccessMsg(result.message);
      setShowSuccessAlert(true);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message);
      setShowErrorAlert(true);
    }
  };
  // 작업 2 - 예약 거절(decline)
  const appointmentBeingDeclined = async (apmtId) => {
    try {
      const result = await declineApmt(apmtId);
      setApmts(
        apmts.map((apmt) =>
          apmt.id == apmtId ? { ...apmt, status: "거절됨" } : apmt
        )
      );
      setSuccessMsg(result.message);
      setShowSuccessAlert(true);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message);
      setShowErrorAlert(true);
    }
  };

  // 환자/고객:
  // 작업 1 - 예약 갱신
  const appointmentBeingUpdated = async (newApmt) => {
    try {
      const result = await updateApmt(newApmt.id, newApmt);
      setApmts(apmts.map((apmt) => (apmt.id == newApmt.id ? newApmt : apmt)));
      setSuccessMsg(result.data.message);
      setShowSuccessAlert(true);
    } catch (e) {
      console.error(e);
    }
  };
  // 작업 2 - 예약 취소
  const appointmentBeingCanceled = async (apmtId) => {
    try {
      const result = await cancelApmt(apmtId);
      setApmts(
        apmts.map((apmt) =>
          apmt.id == apmtId ? { ...apmt, status: "취소됨" } : apmt
        )
      );
      setSuccessMsg(result.message);
      setShowSuccessAlert(true);
    } catch (e) {
      console.error(e);
      setErrorMsg(e.message);
      setShowErrorAlert(true);
    }
  };

  const onSelectStat = (status) => {
    setSelectedStat(status);
  };

  return (
    <Container className="p-3">
      <Accordion className="mt-4 mb-5">
        {apmts.map((apmt, index) => {
          const isWaitingForApproval = apmt.status === "승인대기";
          const statusColor = colors[apmt.status] || colors["default"];
          const isApproved = apmt.status === "승인됨";
          return (
            <Accordion.Item key={apmt.id} eventKey={index} className="mb-5">
              <Accordion.Header>
                <div>
                  <div className="mb-3">날짜: {apmt.date}</div>
                  <div style={{ color: statusColor }}>상태: {apmt.status}</div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col md={4} className="mt-2">
                    <p>
                      예약 번호:{" "}
                      <span className="text-info">{apmt.appointmentNo}</span>
                    </p>
                    <DatePicker
                      locale={ko}
                      selected={new Date(`${apmt.date}T${apmt.time}`)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeInterval={30}
                      timeCaption="시간"
                      dateFormat="yyyy년 MM월 dd일, HH:mm aa"
                      inline
                    />
                    <p>
                      시간:
                      <span className="text-info">{apmt.time}</span>
                    </p>
                    <p>방문 목적: {apmt.reason}</p>
                  </Col>
                  <Col md={8} className="mt-2">
                    <h4>애완 동물:</h4>
                    <PetTable
                      pets={apmt.pets}
                      apmtId={apmt.id}
                      onPetUpdate={handlePetsUpdate}
                      isEditable={isWaitingForApproval}
                      isPatient={isPatient}
                    />
                  </Col>
                  {isApproved && (
                    <UserInfo userType={user.userType} apmt={apmt} />
                  )}
                </Row>
                {showSuccessAlert && (
                  <AlertMessage type={"success"} message={successMsg} />
                )}
                {showErrorAlert && (
                  <AlertMessage type={"danger"} message={errorMsg} />
                )}
                {user && user.userType === UserType.PATIENT && (
                  <div>
                    <ActPatient
                      onUpdate={appointmentBeingUpdated}
                      onCancel={appointmentBeingCanceled}
                      disabled={!isWaitingForApproval}
                      apmt={apmt}
                    />
                  </div>
                )}
                {user && user.userType === UserType.VET && (
                  <div>
                    <ActVeter
                      onApprove={appointmentBeingApproved}
                      onDecline={appointmentBeingDeclined}
                      disabled={!isWaitingForApproval}
                      apmt={apmt}
                    />
                  </div>
                )}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default ApmtAccordion;
