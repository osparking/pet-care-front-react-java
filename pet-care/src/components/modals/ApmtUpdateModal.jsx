import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const ApmtUpdateModal = ({ show, apmt, doClose, doUpdate }) => {
  const [apmtDate, setApmtDate] = useState(new Date(apmt.date));
  const [apmtTime, setApmtTime] = useState(
    new Date(`${apmt.date}T${apmt.time}`)
  );
  const [reason, setReason] = useState(apmt.reason);
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

  const handleSubmit = () => {
    try {
      const updatedApmt = {
        ...apmt,
        date: apmtDate.toISOString().split("T")[0],
        time: apmtTime.toTimeString().split(" ")[0].substring(0, 5),
        reason,
      };
      doUpdate(updatedApmt);
      setSuccessMsg("예약 갱신 성공");
      setShowErrorAlert(false);
      setShowSuccessAlert(true);
    } catch (e) {
      setErrorMsg("예약 갱신 오류: " + e.message);
      setShowErrorAlert(true);
    }
  };

  return (
    <Modal show={show} onHide={doClose}>
      <Modal.Header closeButton>
        <Modal.Title>예약 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {showSuccessAlert && (
            <AlertMessage type={"success"} message={successMsg} />
          )}
          {showErrorAlert && (
            <AlertMessage type={"danger"} message={errorMsg} />
          )}
          <Form.Group controlId="apmtDate">
            <Form.Label className="me-2">진료 날짜</Form.Label>
            <DatePicker
              selected={apmtDate}
              onChange={(date) => setApmtDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
          <Form.Group controlId="apmtTime" className="mt-4">
            <Form.Label className="me-2">진료 시간</Form.Label>
            <DatePicker
              selected={apmtTime}
              onChange={(time) => setApmtTime(time)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              timeCaption="시간"
              dateFormat="HH:mm"
              className="form-control"
              placeholderText="시간 선택"
              required
            />
          </Form.Group>
          <Form.Group controlId="reason" className="mt-2">
            <Form.Label>방문 목적</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="(방문 목적 입력)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={doClose}>
          닫기
        </Button>
        <Button variant="info" onClick={handleSubmit}>
          자료 저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ApmtUpdateModal;
