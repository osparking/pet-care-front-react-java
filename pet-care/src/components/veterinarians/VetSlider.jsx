import React from "react";
import { Carousel } from "react-bootstrap";

const VetSlider = ({ vets }) => {
  return (
    <main>
      <Carousel interval={5000} indicators={true} controls={true}>
        {vets &&
          vets.map((vet, index) => (
            <Carousel.Item key={index}>
              <Row className="align-items-center">
                <Col xs={12} md={4} className="text-center">
                  <Card.Img
                    src={
                      vet.photo
                        ? `data:image/png;base64,${vet.photo}`
                        : placeholderImage
                    }
                    alt={"photo"}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      objectFit: "contain",
                    }}
                  />
                </Col>
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </main>
  );
};

export default VetSlider;
