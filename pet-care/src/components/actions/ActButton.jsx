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
    <Button
      variant={variant}
      size="sm"
      disabled={disabled || isProcessing}
      onClick={onClick}
      className={`me-2 ${className}`}
    >
      {isProcessing ? "처리 중..." : title}
    </Button>
  );
};

export default ActButton;
