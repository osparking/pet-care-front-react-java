import ko from "date-fns/locale/ko";
import React from "react";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";

const ApmtAccordion = ({ apmts }) => {
  registerLocale("ko", ko);
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
                    여기 애완 동물 테이블이 표시된다.
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
