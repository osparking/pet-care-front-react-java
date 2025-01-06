import { ko } from "date-fns/esm/locale";
import React from "react";
import { Accordion, Container } from "react-bootstrap";

const ApmtAccordion = ({ apmts }) => {
  return (
    <Container>
      <Accordion>
        {apmts.map((apmt, index) => {
          return (
            <Accordion.Item key={apmt.id} eventKey={index}>
              <Accordion.Header>
                <div>
                  <div>날짜: {apmt.date}</div>
                  <div>상태: {apmt.status}</div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <Row>
                  <Col>
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
                      dateFormat="yyyy MMMM d, h:mm aa"
                      inline
                    />
                    <p>
                      시간:
                      <span className="text-info">{apmt.time}</span>
                    </p>
                    <p>방문 목적: {apmt.reason}</p>
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </Container>
  );
};

export default ApmtAccordion;
