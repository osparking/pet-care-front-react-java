import React from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";

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
                <Form.Select
                  value={selectedStat}
                  onChange={(e) => onSelectStat(e.target.value)}
                >
                  <option value="all">- 전체 -</option>
                  {statuses.map((status, idx) => (
                    <option value={status} key={idx}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={onClearFilter}
                >
                  조건 초기화
                </Button>
              </InputGroup>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterAppointment;
