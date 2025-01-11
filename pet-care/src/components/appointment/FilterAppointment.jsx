import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const FilterAppointment = ({
  statuses = [],
  selectedStat,
  onSelectStat,
  onClearFilter,
}) => {
  return (
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>상태별 예약 검색</Form.Label>
              <InputGroup>
                <Form.Control></Form.Control>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterAppointment;
