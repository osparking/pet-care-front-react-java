import React from "react";
import { FaStar } from "react-icons/fa";

const RatingAvg = ({ rating }) => {
  const starsMax = 5;
  let stars = [];

  // 찬 별을 rating의 정수부 만큼 삽입
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<FaStar key={i} color="#ffc107" />);
  }

  return <div>RatingAvg</div>;
};

export default RatingAvg;
