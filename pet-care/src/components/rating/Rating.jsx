import React from "react";

const Rating = ({ vetId, onReviewSubmit }) => {
  const [hover, setHover] = useState(null);
  const [review, setReview] = useState({
    rating: null,
    comment: null,
  });

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
