import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";


const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  return (
    <Container>
        <Tabs>
            <Tab></Tab>
            <Tab></Tab>
            <Tab></Tab>
            <Tab></Tab>
        </Tabs>
    </Container>
  );
};

export default UserDashboard;
