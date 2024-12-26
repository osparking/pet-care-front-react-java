import React from "react";
import { Container } from "react-bootstrap";

const Login = () => {
  const [creden, setCreden] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setCreden({ ...creden, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card></Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
