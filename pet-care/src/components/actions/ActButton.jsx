import React from "react";

const ActButton = ({
  title,
  variant,
  onClick,
  disabled,
  isProcessing,
  className = "",
}) => {
  return (
    <div className="d-flex justify-content-end gap-2 mt-2 mb-2">
      <Button
        variant={variant}
        size="sm"
        disabled={disabled || isProcessing}
        onClick={onClick}
        className={`me-2 ${className}`}
      >
        {isProcessing ? "처리 중..." : title}
      </Button>
    </div>
  );
};

export default ActButton;
