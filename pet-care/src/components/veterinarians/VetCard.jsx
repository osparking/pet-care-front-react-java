import React, { Accordion, Col } from "react";
import placeholder from "../../assets/images/placeholder.jpg";

const VetCard = ({ vet }) => {
  return (
    <Col key={vet.id} clasName="mb-4 xs={12}">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div clasName="d-flex align-items-center">
              <Link>
                {vet.photo ? (
                  <Card.Img
                    src={`data:image/png;base64, ${vet.phote}`}
                    clasName="user-image"
                    alt="유저 사진"
                  />
                ) : (
                  <Card.Img
                    src={placeholder}
                    className="user-image"
                    alt="유저 사진"
                  />
                )}
              </Link>
            </div>
            <div>
              <Card.Title className="title">
                {vet.lastName} {vet.firstName} 수의사
              </Card.Title>
              <Card.Title>
                <h6>전문분야: {vet.specialization}</h6>
              </Card.Title>
              <Card.Title className="review rating-stars">
                리뷰: 별 여러 개
              </Card.Title>
              <Link to={""}>진료 예약</Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <Link to={""} clasName="link-2">
                사람들이 어떻게 평가하고 있는가?
              </Link>
              {""}
              <span clasName="margin-left-space">{vet.firstName} 의사</span>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};

export default VetCard;
