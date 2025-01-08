import React from "react";
import { Form, Modal } from "react-bootstrap";

const ApmtUpdateModal = ({ show, apmt, doClose, doUpdate }) => {
  const [apmtDate, setApmtDate] = useState(new Date(apmt.date));
  const [apmtTime, setApmtTime] = useState(
    new Date(`${apmt.date}T${apmt.time}`)
  );
  const [reason, setReason] = useState(apmt.reason);

  const handleSubmit = () => {
    console.log(
      "time: ",
      apmtTime.toTimeString().split(" ")[0].substring(0, 5)
    );
    const updatedApmt = {
      ...apmt,
      date: apmtDate.toISOString().split("T")[0],
      time: apmtTime.toTimeString().split(" ")[0].substring(0, 5),
      reason,
    };
    doUpdate(updatedApmt);
  };

  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>예약 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="apmtDate">
            <Form.Label className="me-2">진료 날짜</Form.Label>
            <DatePicker
              selected={apmtDate}
              onChange={(date) => setApmtDate(date)}
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ApmtUpdateModal;
