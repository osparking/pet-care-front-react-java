import React from "react";

const ActPatient = ({ onUpdate, onCancel, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handleClick = (actionType) => {
    setIsProcessing(true);
    // actionType 에 따라 다르게 처리한다.
  };
  return <div>ActPatient</div>;
};

export default ActPatient;
