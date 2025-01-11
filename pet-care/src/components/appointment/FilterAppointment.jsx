import React from "react";
import { Container } from "react-bootstrap";

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
          <Form></Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FilterAppointment;
