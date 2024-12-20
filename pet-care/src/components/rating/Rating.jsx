import React from "react";
import UseMsgAlerts from "../hooks/UseMsgAlerts";

const Rating = ({ vetId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState({
    rating: null,
    comment: null,
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target.value;
    setReview((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  return <div>Rating</div>;
};

export default Rating;
