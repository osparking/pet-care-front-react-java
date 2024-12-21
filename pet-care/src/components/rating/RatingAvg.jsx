import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

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

  return <div>RatingAvg</div>;
};

export default RatingAvg;
