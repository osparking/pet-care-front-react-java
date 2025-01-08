import React from "react";

const ActPatient = ({ onUpdate, onCancel, disabled }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const handleClick = (actionType) => {
    setIsProcessing(true);
    // actionType 에 따라 다르게 처리한다.
    if (actionType === "update") {
      onUpdate()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    } else {
      onCancel()
        .then(() => {
          setIsProcessing(false);
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  };
  return (
    <section>
      <ActButton
        title={"예약 취소"}
        variant={"danger"}
        onClick={() => handleClick("cancel")}
        disabled={disabled}
        isProcessing={isProcessing}
      />
      <ActButton
        title={"예약 갱신"}
        variant={"primary"}
        onClick={() => handleClick("update")}
        disabled={disabled}
        isProcessing={isProcessing}
      />
    </section>
  );
};

export default ActPatient;
