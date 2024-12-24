import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import AlertMessage from "../common/AlertMessage";
import UseMsgAlerts from "../hooks/UseMsgAlerts";
import { saveReview } from "../review/ReviewService";

const Rating = ({ vetId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const {
    successMsg,
    setSuccessMsg,
    errorMsg,
    setErrorMsg,
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
  } = UseMsgAlerts();

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const reviewerId = 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewInfo = {
      rating: rating,
      comment: comment,
    };

    try {
      const response = await saveReview(reviewerId, vetId, reviewInfo);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      if (onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (err) {
      setErrorMsg("오류: " + err);
      setShowErrorAlert(true);
    }
  };

  return (
    <React.Fragment>
      {showErrorAlert && <AlertMessage type={"danger"} message={errorMsg} />}

      {showSuccessAlert && (
        <AlertMessage type={"success"} message={successMsg} />
      )}

      <Form onSubmit={handleSubmit}>
        <h3>수의사를 평가한다:</h3>
        <div className="mb-3">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <Form.Label key={index} className="me-2">
                <Form.Check
                  type="radio"
                  name="rading"
                  value={ratingValue}
                  onChange={() => handleRatingChange(ratingValue)}
                  checked={rating === ratingValue}
                  inline
                />
                <FaStar
                  size={20}
                  className="star"
                  color={
                    ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                  }
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </Form.Label>
            );
          })}
        </div>
        <div>
          <Form.Control
            as="textarea"
            row="4"
            value={comment}
            required
            onChange={handleCommentChange}
            placeholder="수의사 진료 행위에 대한 의견 기술"
          />
        </div>
        <div className="mt-2">
          <Button type="submit" variant="outline-primary">
            리뷰 저장
          </Button>
        </div>
        <p>
          당신은 이 수의사에게{" "}
          <span style={{ color: "orange" }}>{rating}개</span>의 별점을
          주었습니다.
        </p>
      </Form>
    </React.Fragment>
  );
};

export default Rating;
