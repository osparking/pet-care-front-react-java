import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await getUserById(userId);
        setUser(result.data);
      } catch (error) {}
    };
  }, []);

  return (
    <Container>
      <Tabs>
        <Tab eventkey="profile" title={<h3>프로필</h3>}>
          {user && <UserProfile user={user} />}
        </Tab>
        <Tab></Tab>
        <Tab></Tab>
        <Tab></Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboard;
