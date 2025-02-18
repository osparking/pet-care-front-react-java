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
                <Col xs={12} md={8}>
                  <div>
                    <RatingStars rating={vet.averageRating} />
                  </div>
                  <div>
                    <p className="text-success">
                      {vet.lastName}
                      {vet.firstName} 수의사
                    </p>
                  </div>
                  <p>전문분야: {vet.specialization}</p>
                  <p>
                    <span className="text-info">
                      {`${vet.lastName}${vet.firstName}`} 수의사는{" "}
                      {vet.specialization} 전문이다.
                    </span>
                    대통령은 전시ㆍ사변 또는 이에 준하는 국가비상사태에 있어서
                    병력으로써 군사상의 필요에 응하거나 공공의 안녕질서를 유지할
                    필요가 있을 때에는 법률이 정하는 바에 의하여 계엄을 선포할
                    수 있다. 계엄은 비상계엄과 경비계엄으로 한다. 비상계엄이
                    선포된 때에는 법률이 정하는 바에 의하여 영장제도,
                    언론ㆍ출판ㆍ집회ㆍ결사의 자유, 정부나 법원의 권한에 관하여
                    특별한 조치를 할 수 있다. 계엄을 선포한 때에는 대통령은
                    지체없이 국회에 통고하여야 한다.
                  </p>
                  <p>
                    {`${vet.lastName}${vet.firstName}`}수의사를{" "}
                    <Link
                      to={`/veterinarian/${vet.id}/veterinarian`}
                      className="me-3 link-2"
                    >
                      사람들이 어떻게 평가하고 있는가?
                    </Link>
                  </p>
                  <p>
                    <Link to={"/doctors"} className="me-3">
                      수의사 목록보기
                    </Link>
                  </p>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
      </Carousel>
    </main>
  );
};

export default VetSlider;
