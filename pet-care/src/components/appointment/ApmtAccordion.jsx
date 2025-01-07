import ko from "date-fns/locale/ko";
import React from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import PetTable from "../pet/PetTable";
import useColorMapping from "../hooks/ColorMapping";

const ApmtAccordion = ({ apmts, isPatient }) => {
  registerLocale("ko", ko);
  const handlePetsUpdate = (apmtId) => {
    // TODO: Update appointment status
  };
  const colors = useColorMapping();
  return (
    <Container className="p-3">
      <Accordion className="mt-4 mb-5">
        {apmts.map((apmt, index) => {
          const isWaitingForApproval = apmt.status === "승인대기";
          return (
            <Accordion.Item key={apmt.id} eventKey={index} className="mb-5">
              <Accordion.Header>
                <div>
                  <div className="mb-3">날짜: {apmt.date}</div>
                  <div>상태: {apmt.status}</div>
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
                </Row>
                <div>
                  <Button variant="warning" size="sm">
                    예약 갱신
                  </Button>
                  <Button variant="danger" size="sm" className="ms-2">
                    예약 취소
                  </Button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default ApmtAccordion;
