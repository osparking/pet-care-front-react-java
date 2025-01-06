import React from "react";
import { Accordion, Container } from "react-bootstrap";

const ApmtAccordion = ({ apmts }) => {
  return (
    <Container>
      <Accordion>
        {apmts.map((apmt) => (
          <Accordion.Item key={apmt.id}>
            <Accordion.Header>{apmt.date}</Accordion.Header>
            <Accordion.Body>{apmt.reason}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default ApmtAccordion;
