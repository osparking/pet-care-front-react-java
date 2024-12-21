import React from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const RatingAvg = ({ rating }) => {
  const starsMax = 5;
  let stars = [];

  // 찬 별을 rating의 정수부 만큼 삽입
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={i} color="#ffc107" />);
  }

  // 반 별을 조건부로 하나 삽입
  // 소수점 이하 값이 0.25 이상이면 반별 부여.
  if (rating % 1 >= 0.25) {
    stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
  }

  // 빈 별을 추가 - stars 길이 5 로 만듦
  for (let i = stars.length; i < starsMax; i++) {
    stars.push(<FaRegStar key={i} color="#e4e5e9" />);
  }

  return <span className="me-2 ms-2">{stars}</span>;
};

export default RatingAvg;
