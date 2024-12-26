import React from "react";
import { Container, InputGroup } from "react-bootstrap";
import { BsPersonFill } from "react-icons/bs";

const Login = () => {
  const [creden, setCreden] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCreden({ ...creden, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <Form>
                  <Form.Group>
                    <Form.Label>이메일</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <BsPersonFill />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Form>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
