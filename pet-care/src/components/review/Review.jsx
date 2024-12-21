import React from "react";
import ImageUser from "../common/ImageUser";
import { UserType } from "../utils/utilities";

const Review = ({ review, userType }) => {
  const ratedDoctor =
    userType === UserType.PATIENT
      ? `당신은 ${review.vetName} 수의사의 진료를 평가하였습니다.`
      : `${review.patientName} 고객이 입력한 리뷰입니다.`;

  return (
    <div>
      <div>
        {userType === UserType.VET ? (
          <ImageUser
            userId={review.patientId}
            photoUser={review.patientImage}
          />
        ) : (
          <ImageUser
            userId={review.vetId}
            photoUser={review.vetImage}
          />
        )}
      </div>
    </div>
  );
};

export default Review;
