import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import AlertMessage from "../common/AlertMessage";
import ImageUser from "../common/ImageUser";
import Paginator from "../common/Paginator";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import Rating from "../rating/Rating";
import RatingAvg from "../rating/RatingAvg";
import Review from "../review/Review";
import { getUserById } from "../user/UserService";
import NoDataAvailable from "../common/NoDataAvailable";

const Vet = () => {
  const [vet, setVet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { vetId } = useParams();

  const [currPage, setCurrPage] = useState(1);
  const [pageSize] = useState(2);

  const { errorMsg, setErrorMsg, showErrorAlert, setShowErrorAlert } =
    UseMsgAlerts();

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response = await getUserById(vetId);
      setVet(response.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setErrorMsg(error.response.data.message);
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [vetId]);

  if (isLoading) {
    return <h1>자료 적재 중...</h1>;
  }

  /* 페이지 링크 관련 변수 */
  const indexLastReview = pageSize * currPage;
  const indexFirstReview = indexLastReview - pageSize;
  const currReviews =
    vet.reviews.slice(indexFirstReview, indexLastReview) || [];

  return (
    <Container className="d-flex justify-content-center align-item-center mt-5">
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}
      {vet && (
        <Card className="review-card">
          <Row>
            <Col>
              <ImageUser
                photoUser={vet.photo}
                altText={`${vet.lastName}${vet.firstName} 사진`}
              />
            </Col>
            <Col>
              <Link to={"/doctors"}>
                <BsFillArrowRightSquareFill /> 수의사 목록
              </Link>
            </Col>
          </Row>
          <Card.Body>
            <Card.Title>
              {vet.lastName}
              {vet.firstName} 수의사
            </Card.Title>
            <Card.Text>전문분야: {vet.specialization}</Card.Text>
            {vet.averageRating > 0 && (
              <Card.Text className="rating-stars">
                점수: 별 평균
                {vet.averageRating > 0
                  ? " " + Number(vet.averageRating.toFixed(1))
                  : "0.0"}
                개{" ("}
                <RatingAvg rating={vet.averageRating} />
                {"), "}평가 인원 {vet.totalReviewers || 0}명
              </Card.Text>
            )}
            <Link to={`/appointments/create/${vetId}`} className="link">
              진료 예약
            </Link>

            <hr />
            <p className="about">
              {vet.lastName}
              {vet.firstName} 수의사 소개{" "}
            </p>
            <p>
              대통령은 법률이 정하는 바에 의하여 사면·감형 또는 복권을 명할 수
              있다. 외국인은 국제법과 조약이 정하는 바에 의하여 그 지위가
              보장된다. 각급 선거관리위원회의 조직·직무범위 기타 필요한 사항은
              법률로 정한다. 국민의 모든 자유와 권리는 국가안전보장·질서유지
              또는 공공복리를 위하여 필요한 경우에 한하여 법률로써 제한할 수
              있으며, 제한하는 경우에도 자유와 권리의 본질적인 내용을 침해할 수
              없다. 행정각부의 설치·조직과 직무범위는 법률로 정한다. 일반사면을
              명하려면 국회의 동의를 얻어야 한다. 군사법원의 조직·권한 및
              재판관의 자격은 법률로 정한다.
            </p>
            <hr />
            <Rating vetId={vetId} onReviewSubmit={null} />
            <h4 className="text-center mb-4">리뷰 목록</h4>
            <hr />
            {/* 리뷰 목록 - 페이지 단위 표출 */}
            {currReviews && currReviews.length > 0 ? (
              currReviews.map((review) => (
                <Review
                  key={review.id}
                  review={review}
                  userType={vet.userType}
                />
              ))
            ) : (
              <NoDataAvailable
                dataType={"진료 경험 리뷰"}
                errorMessage={"등록된 리뷰가 없습니다."}
              />
            )}
            <Paginator
              pageSize={pageSize}
              totalItems={vet.reviews.length}
              currPage={currPage}
              setCurrPage={setCurrPage}
            ></Paginator>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Vet;
