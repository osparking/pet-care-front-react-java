import React from "react";
import { Container } from "react-bootstrap";
import VetCard from "./VetCard";

const VetListing = () => {
  const [vets, setVets] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    getVets()
      .then((data) => {
        setVets(data);
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  }, []);

  if (vets.length === 0) {
    return <p>저희는 현재 수의사가 없습니다.</p>;
  }

  return (
    <Row>
      <h6>저희 수의사를 만나보세요</h6>
      <Col>
        <Container>
          <Row>
            <h5>여기서 검색하세요</h5>
          </Row>
        </Container>
      </Col>
      <Col>
        <Container>
          <Row>
            {vets.map((vet, index) => (
              <VetCard key={index} vet={vet} />
            ))}
          </Row>
        </Container>
      </Col>
    </Row>
  );
};

export default VetListing;