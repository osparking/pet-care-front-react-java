import React from "react";
import { Accordion, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ImageUser from "../common/ImageUser";
import RatingAvg from "../rating/RatingAvg";

const VetCard = ({ vet }) => {
  return (
    <Col key={vet.id} className="mb-4 xs={12}">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="d-flex align-items-center">
              <Link>
                <ImageUser photoUser={vet.photo} />
              </Link>
            </div>
            <div>
              <Card.Title className="title">
                {vet.lastName} {vet.firstName} 수의사
              </Card.Title>
              <Card.Title>
                <h6>전문분야: {vet.specialization}</h6>
              </Card.Title>
              <Card.Text className="review rating-stars">
                리뷰: <RatingAvg rating={vet.averageRating} />{"/ "}{vet.totalReviewers}
              </Card.Text>
              <Link to={`/appointments/create/${vet.id}`} className="link">
                진료 예약
              </Link>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div>
              <span className="margin-left-space">
                {vet.lastName}
                {vet.firstName} 의사를
              </span>{" "}
              <Link
                to={`/veterinarian/${vet.id}/veterinarian`}
                className="link-2"
              >
                사람들이 어떻게 평가하고 있는가?
              </Link>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Col>
  );
};

export default VetCard;
