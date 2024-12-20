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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addReview(vetId, reviewerId, review);
      setSuccessMsg(response.message);
      setShowSuccessAlert(true);
      if (onReviewSubmit) {
        onReviewSubmit();
      }
    } catch (err) {
      setErrorMsg("오류: " + err.response.data.message);
      setShowErrorAlert(true);
    }
  };

  return <div>Rating</div>;
};

export default Rating;
